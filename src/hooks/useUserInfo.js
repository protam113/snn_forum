import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getToken, refreshAuthToken } = useAuth();

  const fetchUserInfo = useCallback(async () => {
    const token = await getToken();

    if (!token) {
      setUserInfo(null);
      setUserBlogs([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch user info
      let response = await authApi(token).get(endpoints.currentUser);
      setUserInfo(response.data);

      // Fetch user blogs after getting user info
      const userId = response.data.id;
      const userBlogsUrl = endpoints.currentUserBlog.replace(":id", userId);
      response = await authApi(token).get(userBlogsUrl);
      setUserBlogs(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          try {
            // Fetch user info with new token
            const response = await authApi(newToken).get(endpoints.currentUser);
            setUserInfo(response.data);

            // Fetch user blogs with new token
            const userId = response.data.id;
            const postsResponse = await authApi(newToken).get(
              endpoints.currentUserBlog.replace(":id", userId)
            );
            setUserBlogs(postsResponse.data);
          } catch (innerErr) {
            // Do nothing or handle the error silently
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, [getToken, refreshAuthToken]);

  const updateUserInfo = async (updatedInfo) => {
    const token = await getToken();

    if (!token) {
      // Do nothing or handle the error silently
      return;
    }

    try {
      const response = await authApi(token).patch(
        endpoints.UpdateProfile,
        updatedInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserInfo(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          try {
            const response = await authApi(newToken).patch(
              endpoints.UpdateProfile,
              updatedInfo,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setUserInfo(response.data);
          } catch (innerErr) {}
        }
      }
    }
  };

  const changePassword = async (data) => {
    const token = await getToken();

    if (!token) {
      return { success: false, error: "No token available" };
    }

    try {
      const response = await authApi(token).patch(
        endpoints.ChangePassword,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return { success: true };
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          try {
            const response = await authApi(newToken).patch(
              endpoints.ChangePassword,
              data,
              { headers: { "Content-Type": "application/json" } }
            );
            return { success: true };
          } catch (innerErr) {
            console.error("Retry error:", innerErr.response?.data);
            return {
              success: false,
              error: innerErr.message || "Failed to change password",
            };
          }
        }
      }
      return {
        success: false,
        error: err.response?.data || "Failed to change password",
      };
    }
  };

  const resetPassword = async (email, newPassword, code) => {
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
      return {
        success: false,
        error: err.response?.data || "Failed to reset password",
      };
    }
  };

  const requestVerificationCode = async (email) => {
    try {
      // Make API call to request verification code
      const response = await authApi().post(
        process.env.REACT_APP_Request_Code_ENDPOINT, // Add the endpoint for requesting code
        { email }
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data || "Failed to send verification code",
      };
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return {
    userInfo,
    userBlogs,
    loading,
    updateUserInfo,
    changePassword,
    resetPassword,
    requestVerificationCode,
  };
};

export default useUserInfo;
