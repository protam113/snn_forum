import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories

  // Fetch products by category
  const fetchProductByCategory = useCallback(async (categoryId) => {
    if (!categoryId) {
      toast.error("Cần có ID danh mục");
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
      toast.error(
        err.message || "Đã xảy ra lỗi khi lấy sản phẩm theo danh mục"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new category
  const addCategory = useCallback(
    async (newCategory) => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error("Không có mã thông báo");

        const response = await authApi(token).post(
          endpoints.Categories,
          newCategory
        );
        const createdCategory = response.data;
        setCategories((prevCategories) => [...prevCategories, createdCategory]);
        toast.success("Danh mục đã được thêm thành công");
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi");
        toast.error(err.message || "Đã xảy ra lỗi khi thêm danh mục");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Delete a category
  const handleDeleteCategory = useCallback(
    async (categoryId) => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error("Không có mã thông báo");

        const url = endpoints.Category.replace(":id", categoryId);
        await authApi(token).delete(url);
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
        toast.success("Danh mục đã được xóa thành công");
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi");
        toast.error(err.message || "Đã xảy ra lỗi khi xóa danh mục");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Edit a category
  const editCategory = useCallback(
    async (categoryId, updatedCategory) => {
      setLoading(true);
      try {
        const token = await getToken();
        if (!token) throw new Error("Không có mã thông báo");

        const url = endpoints.Category.replace(":id", categoryId);
        const response = await authApi(token).patch(url, updatedCategory);
        const updatedCategoryData = response.data;
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId ? updatedCategoryData : category
          )
        );
        toast.success("Danh mục đã được cập nhật thành công");
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi");
        toast.error(err.message || "Đã xảy ra lỗi khi cập nhật danh mục");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  return {
    productsByCategory,
    loading,
    error,
    fetchProductByCategory,
    handleDeleteCategory,
    editCategory,
    addCategory,
  };
};

export default useCategories;
