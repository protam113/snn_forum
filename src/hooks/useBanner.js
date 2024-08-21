import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useBanner = () => {
  const [adminBanner, setAdminBanner] = useState([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminBanner = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await authApi(token).get(endpoints.AdminBanner);
      const results = response.data.results;
      setAdminBanner(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy banner quản trị");
      toast.error("Đã xảy ra lỗi khi lấy banner quản trị");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const addBanner = async (newBanner) => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Không có token");
      }
      const response = await authApi(token).post(
        endpoints.UserBanner,
        newBanner,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdBanner = response.data;
      setAdminBanner((prevBanners) => [...prevBanners, createdBanner]);

      toast.success("Đã thêm banner thành công");
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
      toast.error(err.message || "Đã xảy ra lỗi khi thêm banner");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminBanner();
  }, [fetchAdminBanner]);

  return {
    adminBanner,
    loading,
    error,
    addBanner,
  };
};

export default useBanner;
