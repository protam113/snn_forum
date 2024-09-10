import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

const fetchStaticalUser = async (startDate, endDate, token) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }

    if (!startDate || !endDate) {
      throw new Error("Start date hoặc end date không hợp lệ");
    }

    const response = await authApi(token).get(
      `${endpoints.StaticalUser}?start_date=${encodeURIComponent(
        startDate
      )}&end_date=${encodeURIComponent(endDate)}`
    );
    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    throw err;
  }
};

const useStaticalUser = (startDate, endDate) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalUser", startDate, endDate],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalUser(startDate, endDate, token);
    },
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching user statistics:", err);
    },
  });
};

export { useStaticalUser };
