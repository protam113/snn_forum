import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

const fetchCategoryList = async () => {
  try {
    const response = await authApi().get(endpoints.Categories);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi!");
    throw error;
  }
};

// Custom hook for product list
const useCategoryList = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export { useCategoryList };
