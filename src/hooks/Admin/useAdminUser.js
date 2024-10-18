import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

// Hàm fetchAdminUser dùng để lấy danh sách người dùng từ API
const fetchAdminUser = async ({ token, pageParam = 1 }) => {
  try {
    // Gửi yêu cầu GET tới API để lấy danh sách người dùng
    const response = await authApi(token).get(
      `${endpoints.AdminUser}?page=${pageParam}`
    );

    // Destructure dữ liệu nhận được từ response
    const { results, next } = response.data;
    // Xác định trang tiếp theo nếu có
    const nextPage = next ? pageParam + 1 : undefined;

    return {
      results, // Kết quả người dùng
      nextPage, // Trang tiếp theo
    };
  } catch (err) {
    // Hiển thị thông báo lỗi nếu có sự cố trong việc lấy dữ liệu
    toast.error("Đã xảy ra lỗi khi tải danh sách người dùng");
    throw err; // Ném lỗi để useInfiniteQuery xử lý
  }
};

// Custom hook để lấy danh sách người dùng
const useAdminUser = () => {
  const { getToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["adminUser"], // Khóa truy vấn duy nhất cho dữ liệu người dùng
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken(); // Lấy token từ hook auth
      return fetchAdminUser({ token, pageParam }); // Gọi hàm fetchAdminUser
    },
    getNextPageParam: (lastPage) => lastPage.nextPage, // Lấy trang tiếp theo
    staleTime: 60000, // Thời gian giữ dữ liệu còn tươi mới (60 giây)
    cacheTime: 300000, // Thời gian lưu trữ dữ liệu trong cache (5 phút)
    onError: () => {
      toast.error("Đã xảy ra lỗi khi tải danh sách người dùng"); // Thông báo lỗi
    },
  });
};

export { useAdminUser }; // Xuất custom hook
