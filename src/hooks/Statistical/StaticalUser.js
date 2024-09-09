import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

const FetchStaticalUser = async (token) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }
    const response = await authApi(token).get(endpoints.StaticalUser);
    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy thống kê người dùng");
    throw err;
  }
};

const useStaticalUser = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalUser"],
    queryFn: async () => {
      const token = await getToken();
      return FetchStaticalUser(token);
    },
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching user statistics:", err);
    },
  });
};

export { useStaticalUser };
