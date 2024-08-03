import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [personalBlogs, setPersonalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const { getToken, refreshAuthToken } = useAuth();

  const fetchPersonalInfo = useCallback(async () => {
    if (!userId) {
      setPersonalInfo(null);
      setPersonalBlogs([]);
      setLoading(false);
      return;
    }

    const token = await getToken();
    if (!token) {
      setPersonalInfo(null);
      setPersonalBlogs([]);
      setLoading(false);
      return;
    }

    try {
      // Fetch user personal info
      const userInfoUrl = endpoints.UserInfo.replace(":id", userId);
      const response = await authApi(token).get(userInfoUrl);
      setPersonalInfo(response.data);

      // Fetch user blogs
      const personalBlogsUrl = endpoints.currentUserBlog.replace(":id", userId);
      const blogsResponse = await authApi(token).get(personalBlogsUrl);

      // Ensure personalBlogs.data is correctly accessed
      setPersonalBlogs(blogsResponse.data.results || blogsResponse.data);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          try {
            // Fetch user personal info with new token
            const userInfoUrl = endpoints.UserInfo.replace(":id", userId);
            const response = await authApi(newToken).get(userInfoUrl);
            setPersonalInfo(response.data);

            // Fetch user blogs with new token
            const userBlogsUrl = endpoints.currentUserBlog.replace(
              ":id",
              userId
            );
            const blogsResponse = await authApi(newToken).get(userBlogsUrl);

            // Ensure personalBlogs.data is correctly accessed
            setPersonalBlogs(blogsResponse.data.results || blogsResponse.data);
          } catch (innerErr) {
            console.error(
              "Error fetching user info or blogs with new token",
              innerErr
            );
            setError("Error fetching user information or blogs");
          }
        } else {
          setError("Failed to refresh token");
        }
      } else {
        console.error("Error fetching user information or blogs", err);
        setError("Error fetching user information or blogs");
      }
    } finally {
      setLoading(false);
    }
  }, [getToken, refreshAuthToken, userId]);

  useEffect(() => {
    if (userId) {
      fetchPersonalInfo();
    }
  }, [fetchPersonalInfo, userId]);

  return { personalInfo, personalBlogs, loading, error, setUserId };
};

export default usePersonalInfo;
