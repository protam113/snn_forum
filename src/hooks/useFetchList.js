import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";

// Hàm fetch chung cho các loại dữ liệu (products, recruitment, blogs).
const fetchData = async (endpoint, errorMessage) => {
  try {
    const response = await authApi().get(endpoint);
    // Trả về kết quả nếu có, nếu không thì trả về mảng rỗng.
    return response.data.results || [];
  } catch (error) {
    // Log lỗi chi tiết với thông báo tuỳ chỉnh.
    console.error(errorMessage, error);
    throw error;
  }
};

// Custom hook dùng để tạo ra các hook fetch dữ liệu với các thông số khác nhau.
const useCustomQuery = (queryKey, endpoint, errorMessage) => {
  return useQuery({
    queryKey, // Khóa truy vấn.
    queryFn: () => fetchData(endpoint, errorMessage), // Hàm fetch dữ liệu.
    staleTime: 5 * 60 * 1000, // Dữ liệu được xem là hợp lệ trong 5 phút.
    cacheTime: 30 * 60 * 1000, // Giữ cache trong 30 phút.
  });
};

// Các custom hook cụ thể cho từng loại dữ liệu.
const useProducts = () =>
  useCustomQuery(
    ["products"],
    endpoints.Products,
    "Đã xảy ra lỗi khi tải sản phẩm!"
  );
const useRecruitmentList = () =>
  useCustomQuery(
    ["recruitment"],
    endpoints.Recruitment,
    "Đã xảy ra lỗi khi tải tin tuyển dụng!"
  );
const useBlogs = () =>
  useCustomQuery(
    ["blogList"],
    endpoints.Blog,
    "Đã xảy ra lỗi khi tải danh sách blog!"
  );

export { useProducts, useBlogs, useRecruitmentList };
