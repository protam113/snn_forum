import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";

const fetchWeb = async () => {
  try {
    const response = await authApi().get(endpoints.web);
    return response.data.results || response.data || [];
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải web!");
    throw error;
  }
};

export const useWeb = () => {
  return useQuery({
    queryKey: ["web"],
    queryFn: fetchWeb,
    staleTime: Infinity,
    cacheTime: Infinity,
    onError: () => {
      console.error("Đã xảy ra lỗi khi tải web!");
    },
  });
};
