import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const fetchUserApplyList = async (token) => {
  try {
    const response = await authApi(token).get(endpoints.UserApplyList);
    return response.data.results || [];
  } catch (err) {
    toast.error("Error fetching user apply list!");
    throw err;
  }
};

export const useUserApplyList = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["userApplyList"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No token available");

      return fetchUserApplyList(token);
    },
    staleTime: 60000,
    cacheTime: 300000,
    onError: (error) => {
      toast.error("Error fetching user apply list!");
    },
  });
};

export default useUserApplyList;
