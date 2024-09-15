import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";

const fetchUserBanner = async () => {
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

    return sortedUserBanner;
  } catch (err) {
    console.error("Đã xảy ra lỗi khi tải Banner người dùng");
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
      console.error("Đã xảy ra lỗi khi tải Banner người dùng");
    },
  });
};
