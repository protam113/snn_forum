import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";

const useUserBanner = () => {
  const [userBanner, setUserBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBanner = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi().get(endpoints.UserBanner);
      const results = response.data.results;
      setUserBanner(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải Banner người dùng");
      toast.error("Đã xảy ra lỗi khi tải Banner người dùng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBanner();
  }, [fetchUserBanner]);

  return {
    userBanner,
    loading,
    error,
  };
};
export default useUserBanner;
