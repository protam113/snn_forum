import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

const fetchStaticalJobPostGeneral = async (startDate, endDate, token) => {
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
      )}&end_date=${encodeURIComponent(endDate)}`
    );

    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    throw err;
  }
};

const useStaticalJobPostGeneral = (startDate, endDate) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalJobPostGeneral", startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalJobPostGeneral(startDate, endDate, token);
    },
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching product category statistics:", err);
    },
  });
};

export { useStaticalJobPostGeneral };
