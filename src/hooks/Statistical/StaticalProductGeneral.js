import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

const fetchStaticalProductGeneral = async (
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
      `${endpoints.StaticalJobPostGeneral}?start_date=${encodeURIComponent(
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

const useStaticalProductGeneral = (startDate, endDate, frequency) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalProductCategoryGeneral", startDate, endDate, frequency],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalProductGeneral(startDate, endDate, token, frequency);
    },
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching product category statistics:", err);
    },
  });
};

export { useStaticalProductGeneral };
