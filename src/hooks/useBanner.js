import { useState } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { useToastDesign } from "../context/ToastService";

const useBanner = () => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addNotification } = useToastDesign();

  // Fetch

  // Add banner
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

      const results = response.data;

      addNotification("Đã thêm banner thành công", "success");
    } catch (err) {
      console.error(error.message || "Lỗi khi them banner!");
    } finally {
      setLoading(false);
    }
  };

  // Edit banner
  const editBanner = async (bannerId, updatedBanner) => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Không có token");
      }
      const url = endpoints.Banner.replace(":id", bannerId);
      const response = await authApi(token).patch(url, updatedBanner, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const results = response.data;

      addNotification("Đã cập nhật banner thành công", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Đã xảy ra lỗi khi cập nhật banner";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete banner
  const deleteBanner = async (bannerId) => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Không có token");
      }
      const url = endpoints.Banner.replace(":id", bannerId);
      await authApi(token).delete(url);

      // Update the state after successful deletion

      addNotification("Đã xóa banner thành công", "success");
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Đã xảy ra lỗi khi xóa banner";
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addBanner,
    editBanner,
    deleteBanner,
  };
};

export default useBanner;
