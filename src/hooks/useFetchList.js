import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import { decryptData, encryptData } from "../utils/cryptoUtils"; // Ensure you have these functions
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import React from "react";

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

// Custom hook để lấy token
const useToken = () => {
  const { getToken } = useAuth();
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    };

    fetchToken();
  }, [getToken]);

  return token;
};

// Hàm fetch cho blogs
const fetchBlogs = async (token) => {
  const cacheKey = "blogs";
  const cacheTimeKey = `${cacheKey}_time`;
  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);

  const now = new Date().getTime();
  const cacheDuration = 60 * 1000;

  if (cachedData && cachedTime && now - parseInt(cachedTime) < cacheDuration) {
    const parsedData = decryptData(cachedData);
    return parsedData.blogs;
  }

  try {
    const response = await authApi(token).get(endpoints.Blog);
    const results = response.data.results;

    if (!Array.isArray(results)) {
      throw new Error("Results is not an array");
    }

    const sortedBlogs = results.sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

    const likedBlogs = token
      ? sortedBlogs.reduce((acc, blog) => {
          acc[blog.id] = blog.liked || false;
          return acc;
        }, {})
      : {};

    const encryptedData = encryptData({
      blogs: sortedBlogs,
      likedBlogs: likedBlogs,
    });
    localStorage.setItem(cacheKey, encryptedData);
    localStorage.setItem(cacheTimeKey, now.toString());

    return sortedBlogs;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải blog!");
    throw error;
  }
};

// Custom hook cho blogs
const useBlogs = () => {
  const token = useToken();

  return useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs(token),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    enabled: !!true,
  });
};

// Hàm fetch cho recruitments
const fetchTags = async () => {
  try {
    const response = await authApi().get(endpoints.Tag);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

const useTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export { useProducts, useBlogs, useTags };
