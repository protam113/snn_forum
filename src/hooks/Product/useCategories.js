import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

const fetchCategoryList = async (page = 1) => {
  try {
    const response = await authApi().get(
      `${endpoints.Categories}?page=${page}`
    );
    // console.log(response);
    return {
      Categories: response.data.results || [],
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
    };
  } catch (error) {
    toast.error("Đã xảy ra lỗi!");
    throw error;
  }
};

// Custom hook for product list
const useCategoryList = (page) => {
  return useQuery({
    queryKey: ["categories", page],
    queryFn: () => fetchCategoryList(page),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

const AddCategory = async (newCategory, token) => {
  const formData = new FormData();

  formData.append("name", newCategory.name);

  if (!token) throw new Error("No token available");

  try {
    const response = await authApi(token).post(endpoints.Categories, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add Category.");
  }
};

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (newCategory) => {
      const token = await getToken();
      return AddCategory(newCategory, token);
    },
    onSuccess: () => {
      toast.success("Category đã được thêm thành công");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Category.");
    },
  });
};

const editCategory = async ({ categoryId, edtCategory, token }) => {
  if (!token) throw new Error("No token available");
  if (!categoryId) throw new Error("CategoryId is missing");

  const formData = new FormData();
  if (edtCategory.name) {
    formData.append("name", edtCategory.name);
  }

  try {
    const response = await authApi(token).patch(
      endpoints.Category.replace(":id", categoryId), // Use your defined endpoint with :id placeholder
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi cập nhật Category.");
    throw error;
  }
};

const useEditCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ categoryId, edtCategory }) => {
      const token = await getToken();
      return editCategory({ categoryId, edtCategory, token });
    },
    onSuccess: () => {
      toast.success("Category đã được cập nhật thành công");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi cập nhật Category!");
    },
  });
};

const deleteCategory = async ({ categoryId, token }) => {
  if (!token) throw new Error("No token available");
  if (!categoryId) throw new Error("CategoryId is missing");

  try {
    await authApi(token).delete(endpoints.Category.replace(":id", categoryId));
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa Category.");
    throw error;
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ categoryId }) => {
      const token = await getToken();
      return deleteCategory({ categoryId, token });
    },
    onSuccess: () => {
      toast.success("Category đã được xóa thành công");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi xóa category!");
    },
  });
};

export { useCategoryList, useAddCategory, useEditCategory, useDeleteCategory };
