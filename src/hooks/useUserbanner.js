import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useUserBanner = () => {
  const [userBanner, setUserBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBanner = useCallback(async () => {
    setLoading(true);
    const cacheKey = "banner";
    const cacheTimeKey = `${cacheKey}_time`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    const now = new Date().getTime();
    const cacheDuration = 60 * 1000;

    if (
      cachedData &&
      cachedTime &&
      now - parseInt(cachedTime) < cacheDuration
    ) {
      const parsedData = decryptData(cachedData);
      setUserBanner(parsedData);
      setLoading(false);
      return;
    }

    try {
      const response = await authApi().get(endpoints.UserBanner);
      const results = response.data.results;
      if (!Array.isArray(results)) {
        throw new Error("Results is not an array");
      }

      const uniqueResults = Array.from(new Set(results.map((r) => r.id))).map(
        (id) => results.find((r) => r.id === id)
      );
      const sortedUserBanner = uniqueResults.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );

      setUserBanner(results);

      const jsonData = JSON.stringify(sortedUserBanner);
      const encryptedData = encryptData(jsonData);
      localStorage.setItem(cacheKey, encryptedData);
      localStorage.setItem(cacheTimeKey, now.toString());
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
