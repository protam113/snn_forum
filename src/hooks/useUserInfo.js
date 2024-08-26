import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useUserInfo = (personId = null) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [personalBlogs, setPersonalBlogs] = useState([]);
  const [userApplyList, setUserApplyList] = useState([]);
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

  const fetchUserInfo = useCallback(async () => {
    if (userInfoFetchedRef.current) return;

    const token = await getToken();
    if (!token) {
      setUserInfo(null);
      setUserRoles([]);
      setUserBlogs([]);
      setLoading(false);
      return;
    }

    try {
      const response = await authApi(token).get(endpoints.currentUser);
      const userData = response.data;
      setUserInfo(userData);

      const roles = userData.groups.map((group) => group.name);
      setUserRoles(roles);

      // Fetch bài viết của người dùng hiện tại
      const userBlogsUrl = endpoints.currentUserBlog.replace(
        ":id",
        userData.id
      );
      const blogsResponse = await authApi(token).get(userBlogsUrl);
      setUserBlogs(blogsResponse.data);

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

  const fetchPersonalInfo = useCallback(async () => {
    if (personalInfoFetchedRef.current || !personId) return;

    setLoading(true);

    try {
      const userInfoUrl = endpoints.UserInfo.replace(":id", personId);
      const response = await authApi().get(userInfoUrl); // Không cần token ở đây nữa
      setPersonalInfo(response.data);
      personalInfoFetchedRef.current = true;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  const fetchUserBlog = useCallback(async () => {
    setLoading(true);

    try {
      const url = endpoints.currentUserBlog.replace(":id", personId);
      const response = await authApi().get(url); // Không cần token ở đây nữa
      const sortedBlogs = response.data.results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setPersonalBlogs(sortedBlogs);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [personId]);

  const fetchUserApplyList = useCallback(async () => {
    if (userApplyListFetchedRef.current) return;

    const token = await getToken();
    if (!token) return;

    try {
      const response = await authApi(token).get(endpoints.UserApplyList);
      setUserApplyList(response.data.results);
      userApplyListFetchedRef.current = true;
    } catch (err) {
      handleError(err);
    }
  }, [getToken]);

  const handleError = (err) => {
    console.error("Error:", err.response?.data || err.message);
    setError(err.response?.data || err.message);
  };

  useEffect(() => {
    if (personId) {
      fetchPersonalInfo();
      fetchUserBlog();
    } else {
      fetchUserInfo();
      fetchUserApplyList();
    }
  }, [
    fetchPersonalInfo,
    fetchUserInfo,
    fetchUserBlog,
    fetchUserApplyList,
    personId,
  ]);

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
      } catch (err) {
        handleError(err);
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
        handleError(err);
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
      const response = await authApi().post(
        process.env.REACT_APP_Verify_ENDPOINT,
        {
          email,
          new_password: newPassword,
          code,
        }
      );
      return { success: true, data: response.data };
    } catch (err) {
      handleError(err);
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
      handleError(err);
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
    userApplyList,
    userBlogs,
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
