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
      if (!token) throw new Error("Không có token");

      const url = endpoints.ApplyJob.replace(":id", postId);
      const response = await authApi(token).get(url);

      setApplications(response.data.results || []);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        "Đã xảy ra lỗi khi lấy danh sách đơn ứng tuyển";
      setError(errorMessage);
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
  };
};

export default useApplicationsList;
