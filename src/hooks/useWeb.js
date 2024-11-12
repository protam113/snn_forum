import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";

// Hàm lấy dữ liệu web từ API, sử dụng cơ chế kiểm soát lỗi tốt hơn.
const fetchWeb = async () => {
  try {
    const { data } = await authApi().get(endpoints.web);
    // Trả về dữ liệu có thể lấy từ `data.results`, hoặc `data` nếu không có `results`.
    return data?.results ?? data ?? [];
  } catch (error) {
    // Log chi tiết lỗi để dễ dàng debug.
    console.error("Lỗi khi tải web:", error);
    throw error; // Đảm bảo lỗi được ném ra để react-query có thể xử lý.
  }
};

// Hook `useWeb` cải thiện với việc thêm cấu hình retry và refetch hiệu quả hơn.
export const useWeb = () => {
  return useQuery({
    queryKey: ["web"], // Khóa truy vấn, giúp cache dữ liệu dựa trên queryKey này.
    queryFn: fetchWeb, // Hàm lấy dữ liệu từ API.
    staleTime: 60 * 60 * 1000, // 1 giờ, tránh refetch không cần thiết.
    cacheTime: 2 * 60 * 60 * 1000, // 2 giờ, sau thời gian này cache sẽ bị xoá.
    retry: 2, // Cố gắng retry tối đa 2 lần nếu xảy ra lỗi.
    refetchOnWindowFocus: false, // Tránh refetch khi người dùng quay lại tab, giúp tiết kiệm tài nguyên.
    onError: (error) => {
      // Xử lý khi có lỗi xảy ra, log chi tiết hơn để dễ dàng theo dõi.
      console.error("Đã xảy ra lỗi khi tải web:", error);
    },
  });
};
