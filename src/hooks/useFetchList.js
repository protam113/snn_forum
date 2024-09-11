import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import { toast } from "react-toastify";

// Hàm fetch cho products
const fetchProducts = async () => {
  try {
    const response = await authApi().get(endpoints.Products);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

// Custom hook cho products
const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

const fetchRecruitmentList = async () => {
  try {
    const response = await authApi().get(endpoints.Recruitment);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải tin tuyển dụng!");
    throw error;
  }
};

// Custom hook for Recruitment list
const useRecruitmentList = () => {
  return useQuery({
    queryKey: ["recruitment"],
    queryFn: fetchRecruitmentList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

// Custom hook để lấy token

const fetchBlogList = async () => {
  try {
    const response = await authApi().get(endpoints.Blog);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải tin tuyển dụng!");
    throw error;
  }
};

// Custom hook for Recruitment list
const useBlogs = () => {
  return useQuery({
    queryKey: ["blogList"],
    queryFn: fetchBlogList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
// Hàm fetch cho blogs

export { useProducts, useBlogs, useRecruitmentList };
