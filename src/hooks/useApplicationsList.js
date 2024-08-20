import { useState, useCallback, useEffect } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useApplicationsList = (postId) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const fetchApplicationList = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) throw new Error("No token available");

      const url = endpoints.ApplyJob.replace(":id", postId);

      const response = await authApi(token).get(url);

      setApplications(response.data.results);
    } catch (error) {
      console.error("Error fetching application list:", error);
      setError(
        error.response?.data?.detail || "Error fetching application list"
      );
    } finally {
      setLoading(false);
    }
  }, [postId, getToken]);

  useEffect(() => {
    fetchApplicationList();
  }, [fetchApplicationList]);

  return {
    applications,
    loading,
    error,
    fetchApplicationList,
  };
};

export default useApplicationsList;
