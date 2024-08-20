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
      setError("An error occurred while fetching user banners");
      toast.error("An error occurred while fetching user banners");
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
