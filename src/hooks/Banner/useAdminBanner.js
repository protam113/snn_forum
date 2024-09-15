import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const fetchAdminBanner = async ({ pageParam = 1, token }) => {
  const pageSize = 20;
  try {
    const response = await authApi(token).get(
      `${endpoints.AdminBanner}?page=${pageParam}&pageSize=${pageSize}`
    );
    const adminBanner = response.data.results || [];
    return {
      adminBanner,
      nextPage: response.data.next ? pageParam + 1 : undefined, // Return `undefined` if no next page
    };
  } catch (err) {
    console.error("Đã xảy ra lỗi khi lấy danh Banner");
    throw err;
  }
};

const useAdminBanner = () => {
  const { getToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["adminBanner"],
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken();
      return fetchAdminBanner({ token, pageParam });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000,
    cacheTime: 300000,
    onError: (err) => {
      console.error("Đã xảy ra lỗi khi lấy danh Banner");
    },
  });
};

export { useAdminBanner };
