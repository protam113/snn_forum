import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

// Hàm fetchAdminBanner dùng để lấy danh sách banner của quản trị viên từ API
const fetchAdminBanner = async ({ pageParam = 1, token }) => {
  const pageSize = 20; // Kích thước trang mặc định là 20
  try {
    // Gửi yêu cầu GET tới API để lấy danh sách banner
    const response = await authApi(token).get(
      `${endpoints.AdminBanner}?page=${pageParam}&pageSize=${pageSize}`
    );

    // Lấy danh sách banner từ response hoặc trả về mảng rỗng nếu không có
    const adminBanner = response.data.results || [];

    // Trả về danh sách banner và trang tiếp theo (nếu có)
    return {
      adminBanner,
      nextPage: response.data.next ? pageParam + 1 : undefined, // Trả về `undefined` nếu không còn trang tiếp theo
    };
  } catch (err) {
    // Ghi log lỗi nếu có sự cố trong việc lấy dữ liệu
    console.error("Đã xảy ra lỗi khi lấy danh Banner");
    throw err; // Ném lỗi để useInfiniteQuery xử lý
  }
};

// Custom hook để lấy danh sách banner của quản trị viên
const useAdminBanner = () => {
  const { getToken } = useAuth(); // Khai báo hook để lấy token

  return useInfiniteQuery({
    queryKey: ["Banner"], // Khóa truy vấn duy nhất cho dữ liệu banner
    queryFn: async ({ pageParam = 1 }) => {
      const token = await getToken(); // Lấy token từ hook auth
      return fetchAdminBanner({ token, pageParam }); // Gọi hàm fetchAdminBanner
    },
    getNextPageParam: (lastPage) => lastPage.nextPage, // Lấy trang tiếp theo
    staleTime: 60000, // Thời gian giữ dữ liệu còn tươi mới (60 giây)
    cacheTime: 300000, // Thời gian lưu trữ dữ liệu trong cache (5 phút)
    onError: (err) => {
      // Ghi log lỗi khi có lỗi xảy ra
      console.error("Đã xảy ra lỗi khi lấy danh Banner");
    },
  });
};

export { useAdminBanner }; // Xuất custom hook
