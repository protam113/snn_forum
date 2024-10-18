import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";

// Hàm fetchUserBanner dùng để lấy danh sách banner người dùng từ API
const fetchUserBanner = async () => {
  try {
    // Gửi yêu cầu GET tới API để lấy danh sách banner người dùng
    const response = await authApi().get(endpoints.UserBanner);
    const results = response.data.results;

    // Kiểm tra xem results có phải là một mảng không
    if (!Array.isArray(results)) {
      throw new Error("Results is not an array");
    }

    // Loại bỏ các banner trùng lặp dựa trên id
    const uniqueResults = Array.from(new Set(results.map((r) => r.id))).map(
      (id) => results.find((r) => r.id === id)
    );

    // Sắp xếp banner theo ngày tạo (mới nhất trước)
    const sortedUserBanner = uniqueResults.sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

    return sortedUserBanner; // Trả về danh sách banner đã sắp xếp
  } catch (err) {
    // Ghi log lỗi nếu có sự cố trong việc lấy dữ liệu
    console.error("Đã xảy ra lỗi khi tải Banner người dùng");
    throw err; // Ném lỗi để useQuery xử lý
  }
};

// Custom hook để lấy danh sách banner người dùng
export const useUserBanner = () => {
  return useQuery({
    queryKey: ["Banner"], // Khóa truy vấn duy nhất cho dữ liệu banner
    queryFn: fetchUserBanner, // Gọi hàm fetchUserBanner
    staleTime: 60000, // Thời gian giữ dữ liệu còn tươi mới (60 giây)
    cacheTime: 300000, // Thời gian lưu trữ dữ liệu trong cache (5 phút)
    onError: (error) => {
      // Ghi log lỗi khi có lỗi xảy ra
      console.error("Đã xảy ra lỗi khi tải Banner người dùng", error);
    },
  });
};
