import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import { authApi, endpoints } from "../../api/api";

const fetchPersonalInfo = async (personId, token) => {
  if (!personId) throw new Error("Invalid person ID");

  const userInfoUrl = endpoints.UserInfo.replace(":id", personId);
  try {
    // Nếu không có token, gọi API mà không cần token
    const response = await authApi(token ? token : null).get(userInfoUrl);
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi nếu không có token
    throw new Error(
      error.response?.data?.message || "Unable to fetch user info"
    );
  }
};

// Hook để lấy thông tin cá nhân
const usePersonInfo = (personId) => {
  const { getToken } = useAuth();
  const token = getToken(); // Lấy token một lần ở đây

  return useQuery({
    queryKey: ["personalInfo", personId],
    queryFn: async () => {
      return fetchPersonalInfo(personId, token);
    },
    enabled: !!personId, // Chỉ gọi API khi personId hợp lệ
    onSuccess: (data) => {
      console.log("Fetched personal info:", data);
    },
    onError: (error) => {
      console.error("Error fetching personal info:", error);
    },
  });
};

export default usePersonInfo;
