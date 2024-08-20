import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [personalBlogs, setPersonalBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const { getToken } = useAuth();

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
      setPersonalBlogs(blogsResponse.data.results || []);
    } catch (err) {
      console.error("Error fetching user information or blogs", err);
      setError("Error fetching user information or blogs");
    } finally {
      setLoading(false);
    }
  }, [getToken, userId]);

  useEffect(() => {
    if (userId) {
      fetchPersonalInfo();
    }
  }, [fetchPersonalInfo, userId]);

  return { personalInfo, personalBlogs, loading, error, setUserId };
};

export default usePersonalInfo;
