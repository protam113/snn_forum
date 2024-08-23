import { useState, useEffect, useCallback, useMemo } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userApplyList, setUserApplyList] = useState([]);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  // Fetch user info and blogs
  const fetchUserInfo = useCallback(async () => {
    const token = await getToken();

    if (!token) {
      setUserInfo(null);
      setUserRoles([]);
      setUserBlogs([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch user info
      const response = await authApi(token).get(endpoints.currentUser);
      const userData = response.data;
      setUserInfo(userData);

      // Extract roles from the groups array
      const roles = userData.groups.map((group) => group.name);
      setUserRoles(roles);

      const userId = userData.id;
      const userBlogsUrl = endpoints.currentUserBlog.replace(":id", userId);
      const blogsResponse = await authApi(token).get(userBlogsUrl);
      setUserBlogs(blogsResponse.data);
    } catch (err) {
      console.error(
        "Error fetching user info:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  // Fetch user apply list
  const fetchUserApplyList = useCallback(async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const response = await authApi(token).get(endpoints.UserApplyList);
      setUserApplyList(response.data.results);
    } catch (err) {
      console.error(
        "Error fetching user apply list:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
    }
  }, [getToken]);

  // Fetch user info and apply list on mount
  useEffect(() => {
    fetchUserInfo();
    fetchUserApplyList();
  }, [fetchUserInfo, fetchUserApplyList]);

  // Memoize user roles to avoid unnecessary re-computations
  const memoizedUserRoles = useMemo(() => userRoles, [userRoles]);

  // Update user info
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
        console.error(
          "Error updating user info:",
          err.response?.data || err.message
        );
      }
    },
    [getToken]
  );

  // Change password
  const changePassword = useCallback(
    async (data) => {
      const token = await getToken();

      if (!token) {
        return { success: false, error: "No token available" };
      }

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
        return {
          success: false,
          error: err.response?.data || "Failed to change password",
        };
      }
    },
    [getToken]
  );

  // Reset password
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
      console.error(
        "Error resetting password:",
        err.response?.data || err.message
      );
      return {
        success: false,
        error: err.response?.data || "Failed to reset password",
      };
    }
  }, []);

  // Request verification code
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
      return {
        success: false,
        error: err.response?.data || "Failed to send verification code",
      };
    }
  }, []);

  return {
    userInfo,
    userRoles: memoizedUserRoles, // Use memoized user roles
    userApplyList,
    userBlogs,
    loading,
    error,
    updateUserInfo,
    changePassword,
    resetPassword,
    requestVerificationCode,
  };
};

export default useUserInfo;
