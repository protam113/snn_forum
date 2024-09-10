import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

const fetchStaticalBlogGeneral = async (
  startDate,
  endDate,
  token,
  frequency = "day"
) => {
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
      )}&end_date=${encodeURIComponent(endDate)}&frequency=${encodeURIComponent(
        frequency
      )}`
    );

    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    throw err;
  }
};

const useStaticalBlogGeneral = (startDate, endDate, frequency) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalBlogGeneral", startDate, endDate, frequency],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalBlogGeneral(startDate, endDate, token, frequency);
    },
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching blog statistics:", err);
    },
    refetchOnWindowFocus: true,
  });
};

export { useStaticalBlogGeneral };
