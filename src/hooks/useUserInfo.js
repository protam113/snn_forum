import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useUserInfo = (personId = null) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  const userInfoFetchedRef = useRef(false);
  const personalInfoFetchedRef = useRef(false);

  const cacheUserInfo = useCallback((data) => {
    const encryptedData = encryptData(JSON.stringify(data));
    localStorage.setItem("user_info", encryptedData);
  }, []);

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const getCachedUserInfo = useCallback(() => {
    const cachedData = localStorage.getItem("user_info");
    if (cachedData) {
      try {
        const decryptedData = decryptData(cachedData);
        if (isValidJSON(decryptedData)) {
          return JSON.parse(decryptedData);
        } else {
          console.error("Decrypted data is not valid JSON");
          localStorage.removeItem("user_info");
          return null;
        }
      } catch (error) {
        console.error("Error decrypting user info:", error);
        localStorage.removeItem("user_info");
        return null;
      }
    }
    return null;
  }, []);

  const fetchUserInfo = useCallback(async () => {
    if (userInfoFetchedRef.current) return;

    setLoading(true);

    const cachedData = getCachedUserInfo();
    if (cachedData) {
      setUserInfo(cachedData);
      setUserRoles(cachedData.groups.map((group) => group.name));
      userInfoFetchedRef.current = true;
      setLoading(false);
      return;
    }

    const token = await getToken();

    if (!token) {
      setUserInfo(null);
      setUserRoles([]);
      setLoading(false);
      return;
    }

    try {
      const response = await authApi(token).get(endpoints.currentUser);
      const userData = response.data;

      cacheUserInfo(userData);
      setUserInfo(userData);
      setUserRoles(userData.groups.map((group) => group.name));
      userInfoFetchedRef.current = true;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, getCachedUserInfo, cacheUserInfo]);

  const fetchPersonalInfo = useCallback(async () => {
    if (personalInfoFetchedRef.current || !personId) return;

    try {
      const userInfoUrl = endpoints.UserInfo.replace(":id", personId);
      const response = await authApi().get(userInfoUrl);
      setPersonalInfo(response.data);
      personalInfoFetchedRef.current = true;
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfoFetchedRef.current) {
        await fetchUserInfo();
        userInfoFetchedRef.current = true;
      }

      if (personId && !personalInfoFetchedRef.current) {
        await fetchPersonalInfo();
        personalInfoFetchedRef.current = true;
      }
    };

    fetchData();
  }, [fetchUserInfo, fetchPersonalInfo, personId]);

  const memoizedUserRoles = useMemo(() => userRoles, [userRoles]);

  const updateUserInfo = useCallback(
    async (updatedInfo) => {
      const token = await getToken();
      if (!token) return;

      try {
        const response = await authApi(token).patch(
          endpoints.UpdateProfile,
          updatedInfo,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setUserInfo(response.data);
        cacheUserInfo(response.data);
      } catch (err) {
        console.error(
          "Error updating user info:",
          err.response?.data || err.message
        );
        setError(err.response?.data || err.message);
      }
    },
    [getToken]
  );

  const changePassword = useCallback(
    async (data) => {
      const token = await getToken();
      if (!token) return { success: false, error: "No token available" };

      try {
        await authApi(token).patch(endpoints.ChangePassword, data, {
          headers: { "Content-Type": "application/json" },
        });
        return { success: true };
      } catch (err) {
        console.error(
          "Error changing password:",
          err.response?.data || err.message
        );
        setError(err.response?.data || err.message);
        return {
          success: false,
          error: err.response?.data || "Failed to change password",
        };
      }
    },
    [getToken]
  );

  const resetPassword = useCallback(async (email, newPassword, code) => {
    try {
      const response = await authApi().post(endpoints.Verify, {
        email,
        new_password: newPassword,
        code,
      });
      return { success: true, data: response.data };
    } catch (err) {
      console.error(
        "Error resetting password:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data || "Failed to reset password",
      };
    }
  }, []);

  const requestVerificationCode = useCallback(async (email) => {
    try {
      await authApi().post(process.env.REACT_APP_Request_Code_ENDPOINT, {
        email,
      });
      return { success: true };
    } catch (err) {
      console.error(
        "Error requesting verification code:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data || "Failed to send verification code",
      };
    }
  }, []);

  return {
    userInfo,
    userRoles: memoizedUserRoles,
    personalInfo,
    loading,
    error,
    updateUserInfo,
    changePassword,
    resetPassword,
    requestVerificationCode,
  };
};

export default useUserInfo;
