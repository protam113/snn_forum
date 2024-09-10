import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const fetchAdminUser = async ({ token, pageParam = 1 }) => {
  try {
    const response = await authApi(token).get(
      `${endpoints.AdminUser}?page=${pageParam}`
    );
    const { results, next } = response.data;
    const nextPage = next ? pageParam + 1 : undefined;
    return {
      results,
      nextPage,
    };
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi tải danh sách người dùng");
    throw err;
  }
};

const useAdminUser = () => {
  const { getToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["adminUser"],
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken();
      return fetchAdminUser({ token, pageParam });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000, // Thời gian giữ dữ liệu còn tươi mới
    cacheTime: 300000, // Thời gian lưu trữ dữ liệu trong cache
    onError: () => {
      toast.error("Đã xảy ra lỗi khi tải danh sách người dùng");
    },
  });
};

export { useAdminUser };
