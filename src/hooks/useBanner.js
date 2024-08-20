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
      const token = await getToken(); // Get the token
      const response = await authApi(token).get(endpoints.AdminBanner);
      const results = response.data.results;
      setAdminBanner(results);
    } catch (err) {
      setError("An error occurred while fetching admin banners");
      toast.error("An error occurred while fetching admin banners");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  const addBanner = async (newBanner) => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token available");
      }

      // Check if your server expects `FormData` or JSON
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
      adminBanner((prevBanners) => [...prevBanners, createdBanner]);

      toast.success("Banner added successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred while adding the banner");
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
