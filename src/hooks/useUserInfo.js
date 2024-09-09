import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useUserInfo = (personId = null) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [personalBlogs, setPersonalBlogs] = useState([]);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  const userInfoFetchedRef = useRef(false);
  const personalInfoFetchedRef = useRef(false);
  const userApplyListFetchedRef = useRef(false);

  useEffect(() => {
    userInfoFetchedRef.current = false;
    personalInfoFetchedRef.current = false;
    userApplyListFetchedRef.current = false;
  }, [personId]);

  // Cache User Info with encryption
  const cacheUserInfo = (data) => {
    const encryptedData = encryptData(JSON.stringify(data));
    localStorage.setItem("user_info", encryptedData);
  };

  const getCachedUserInfo = () => {
    const cachedData = localStorage.getItem("user_info");
    if (cachedData) {
      try {
        const decryptedData = decryptData(cachedData);
        return decryptedData; // Directly return the decrypted data
      } catch (error) {
        console.error("Error decrypting user info:", error);
        localStorage.removeItem("user_info");
        return null;
      }
    }
    return null;
  };
  // Fetch User Info with Caching
  const fetchUserInfo = useCallback(async () => {
    if (userInfoFetchedRef.current) return;

    setLoading(true);

    // Try to get data from cache
    const cachedData = getCachedUserInfo();
    if (cachedData) {
      setUserInfo(cachedData);
      setUserRoles(cachedData.groups.map((group) => group.name));
      setLoading(false);
      userInfoFetchedRef.current = true;
      return;
    }

    // Get the token
    const token = await getToken();
    if (!token) {
      setUserInfo(null);
      setUserRoles([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch user info
      const response = await authApi(token).get(endpoints.currentUser);
      const userData = response.data;

      setUserInfo(userData);
      cacheUserInfo(userData);

      const roles = userData.groups.map((group) => group.name);
      setUserRoles(roles);

      userInfoFetchedRef.current = true;
    } catch (err) {
      console.error(
        "Error fetching user info:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  // Caching and fetching for personal info
  const fetchPersonalInfo = useCallback(async () => {
    if (personalInfoFetchedRef.current || !personId) return;

    try {
      const userInfoUrl = endpoints.UserInfo.replace(":id", personId);
      const response = await authApi().get(userInfoUrl); // No token needed
      setPersonalInfo(response.data);
      personalInfoFetchedRef.current = true;
    } catch (err) {
      console.error(
        "Error fetching personal info:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  const fetchUserBlog = useCallback(async () => {
    if (!personId) return; // Skip if no personId

    try {
      const url = endpoints.currentUserBlog.replace(":id", personId);
      const response = await authApi().get(url); // No token needed

      const sortedBlogs = response.data.results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setPersonalBlogs(sortedBlogs);
    } catch (err) {
      console.error(
        "Error fetching user blogs:",
        err.response?.data || err.message
      );
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
        await fetchUserBlog();
      }
    };

    fetchData();
  }, [fetchUserInfo, fetchPersonalInfo, fetchUserBlog, personId]);

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
        cacheUserInfo(response.data); // Cache updated info
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
    personalBlogs,
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
