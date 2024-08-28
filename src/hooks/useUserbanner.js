// hooks/useUserBanner.js
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const fetchUserBanner = async () => {
  const cacheKey = "banner";
  const cacheTimeKey = `${cacheKey}_time`;
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);

  const now = new Date().getTime();
  const cacheDuration = 60 * 1000;

  if (cachedData && cachedTime && now - parseInt(cachedTime) < cacheDuration) {
    return decryptData(cachedData);
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

    const jsonData = JSON.stringify(sortedUserBanner);
    const encryptedData = encryptData(jsonData);
    localStorage.setItem(cacheKey, encryptedData);
    localStorage.setItem(cacheTimeKey, now.toString());

    return sortedUserBanner;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi tải Banner người dùng");
    throw err;
  }
};

export const useUserBanner = () => {
  return useQuery({
    queryKey: ["userBanner"],
    queryFn: fetchUserBanner,
    staleTime: 60000,
    cacheTime: 300000,
    onError: (error) => {
      toast.error("Đã xảy ra lỗi khi tải Banner người dùng");
    },
  });
};
