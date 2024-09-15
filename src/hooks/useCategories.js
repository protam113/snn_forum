import { useState, useCallback } from "react";
import { authApi, endpoints } from "../api/api";

const useCategories = () => {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products by category
  const fetchProductByCategory = useCallback(async (categoryId) => {
    if (!categoryId) {
      console.error("fetchProductByCategory: ID danh mục bị thiếu");
      return;
    }

    setLoading(true);
    try {
      const url = endpoints.CategoryProduct.replace(":id", categoryId);
      const response = await authApi().get(url);
      const products = response.data.results;
      setProductsByCategory(products);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm theo danh mục:", err);
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    productsByCategory,
    loading,
    error,
    fetchProductByCategory,
  };
};

export default useCategories;
