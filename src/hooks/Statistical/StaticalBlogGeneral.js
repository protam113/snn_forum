import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

// Hàm gọi API để lấy dữ liệu thống kê blog
const fetchStaticalBlogGeneral = async (startDate, endDate, token) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }

    if (!startDate || !endDate) {
      throw new Error("Start date hoặc end date không hợp lệ");
    }

    const response = await authApi(token).get(
      `${endpoints.StaticalBlogGeneral}?start_date=${encodeURIComponent(
        startDate
      )}&end_date=${encodeURIComponent(endDate)}`
    );

    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    throw err; // Đảm bảo lỗi được ném ra để React Query có thể quản lý
  }
};

// Custom hook sử dụng React Query để lấy dữ liệu thống kê blog
const useStaticalBlogGeneral = (startDate, endDate) => {
  const { getToken } = useAuth(); // Đảm bảo useAuth được sử dụng trong component hoặc hook

  return useQuery({
    queryKey: ["staticalBlogGeneral", startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalBlogGeneral(startDate, endDate, token);
    },
    staleTime: 60000, // Thay đổi thời gian lưu trữ cache nếu cần
    onError: (err) => {
      console.log("Error fetching blog statistics:", err);
    },
  });
};

export { useStaticalBlogGeneral };
