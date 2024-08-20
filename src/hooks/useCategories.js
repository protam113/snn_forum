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

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApi().get(endpoints.Categories);
      const results = response.data.results;
      setCategories(results);
    } catch (err) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred while fetching categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductByCategory = useCallback(async (categoryId) => {
    if (!categoryId) {
      toast.error("Category ID is required");
      console.error("fetchProductByCategory: Category ID is missing");
      return;
    }

    setLoading(true);
    try {
      const url = endpoints.CategoryProduct.replace(":id", categoryId);

      const response = await authApi().get(url);
      const products = response.data.results;
      setProductsByCategory(products);
    } catch (err) {
      console.error("Error fetching products by category:", err); // Log the full error
      setError(err.message || "An error occurred");
      toast.error(
        err.message || "An error occurred while fetching products by category"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = async (newCategory) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available");
      }
      const response = await authApi(token).post(
        endpoints.Categories,
        newCategory
      );
      const createdCategory = response.data;
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
      toast.success("Category added successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available");
      }
      const url = endpoints.Category.replace(":id", categoryId);
      await authApi(token).delete(url);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      toast.success("Category deleted successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
      toast.error(
        err.message || "An error occurred while deleting the category"
      );
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (categoryId, updatedCategory) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available");
      }
      const url = endpoints.Category.replace(":id", categoryId);
      const response = await authApi(token).patch(url, updatedCategory);
      const updatedCategoryData = response.data;
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === categoryId ? updatedCategoryData : category
        )
      );
      toast.success("Category updated successfully");
    } catch (err) {
      setError(err.message || "An error occurred");
      toast.error(
        err.message || "An error occurred while updating the category"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    productsByCategory,
    loading,
    error,
    fetchProductByCategory, // Expose fetchProductByCategory for use in components
    addCategory,
    handleDeleteCategory,
    editCategory,
  };
};

export default useCategories;
