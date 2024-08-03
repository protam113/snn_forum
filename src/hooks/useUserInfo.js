import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            console.error("Error fetching user info with new token", innerErr);
            setError("Error fetching user information");
          }
        } else {
          setError("Failed to refresh token");
        }
      } else {
        console.error("Error fetching user information", err);
        setError("Error fetching user information");
      }
    } finally {
      setLoading(false);
    }
  }, [getToken, refreshAuthToken]);

  const updateUserInfo = async (updatedInfo) => {
    const token = await getToken();

    if (!token) {
      setError("No token available");
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
              endpoints.updateProfile,
              updatedInfo,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setUserInfo(response.data);
          } catch (innerErr) {
            console.error("Error updating user info with new token", innerErr);
            setError("Error updating user information");
          }
        } else {
          setError("Failed to refresh token");
        }
      } else {
        console.error("Error updating user information", err);
        setError("Error updating user information");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { userInfo, userBlogs, loading, error, updateUserInfo };
};

export default useUserInfo;
