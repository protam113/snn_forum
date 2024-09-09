import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

const fetchGroups = async (getToken) => {
  try {
    const token = await getToken();
    const response = await authApi(token).get(endpoints.GroupList);
    return response.data.results || [];
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy danh sách nhóm");
    throw err;
  }
};

const useGroups = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(getToken),
    staleTime: 60000,
    onError: (err) => {
      console.log("Error fetching groups:", err);
    },
  });
};

export { useGroups };
