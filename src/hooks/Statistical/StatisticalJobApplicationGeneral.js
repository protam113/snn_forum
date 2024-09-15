import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const fetchStatisticalJobApplicationGeneral = async (
  startDate,
  endDate,
  token
) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }

    if (!startDate || !endDate) {
      throw new Error("Start date hoặc end date không hợp lệ");
    }

    const response = await authApi(token).get(
      `${
        endpoints.StaticalJobApplicationGeneral
      }?start_date=${encodeURIComponent(
        startDate
      )}&end_date=${encodeURIComponent(endDate)}`
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("Không có dữ liệu thống kê");
    }

    return response.data;
  } catch (err) {
    console.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê", err);
    throw err;
  }
};

const useStatisticalJobApplicationGeneral = (startDate, endDate) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["statisticalJobApplicationGeneral", startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      return fetchStatisticalJobApplicationGeneral(startDate, endDate, token);
    },
    enabled: !!startDate && !!endDate,
    staleTime: 60000,
    cacheTime: 300000,
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message !== "Không có dữ liệu thống kê") {
        return true;
      }
      return false;
    },
    onError: () => {},
    refetchOnWindowFocus: true,
  });
};

export { useStatisticalJobApplicationGeneral };
