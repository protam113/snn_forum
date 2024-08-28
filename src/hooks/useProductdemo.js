// hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import { toast } from "react-toastify";

const fetchProducts = async () => {
  try {
    const response = await authApi().get(endpoints.Products);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60000,
    cacheTime: 300000,
    onError: (error) => {
      // Handle errors
      toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    },
  });
};
