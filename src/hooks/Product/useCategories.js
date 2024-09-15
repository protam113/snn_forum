import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useToastDesign } from "../../context/ToastService";

const fetchCategoryList = async (page = 1) => {
  try {
    const response = await authApi().get(
      `${endpoints.Categories}?page=${page}`
    );
    return {
      categories: response.data.results || [],
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
    };
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải danh sách danh mục!");
    throw error;
  }
};

const useCategoryList = (page) => {
  const { addNotification } = useToastDesign();

  return useQuery({
    queryKey: ["categories", page],
    queryFn: () => fetchCategoryList(page),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: (failureCount, error) => {
      if (failureCount < 3) {
        return true;
      }
      return false;
    },
    onError: (error) => {
      addNotification(
        "Đã xảy ra lỗi khi tải danh sách danh mục:",
        "error",
        error.message
      );
    },
  });
};

// Function to fetch products by category
const fetchProductByCategory = async (categoryId, page = 1) => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }

    const response = await authApi().get(
      `${endpoints.CategoryProduct.replace(":id", categoryId)}?page=${page}`
    );

    return {
      ProductsByCategory: response.data.results || [],
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
    };
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy sản phẩm theo thể loại!");
    throw error;
  }
};

const useProductByCategory = (categoryId, page) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId, page],
    queryFn: () => fetchProductByCategory(categoryId, page),
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
    console.error(error.response?.data?.message || "Failed to add Category.");
  }
};

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async (newCategory) => {
      const token = await getToken();
      return AddCategory(newCategory, token);
    },
    onSuccess: () => {
      addNotification("Category đã được thêm thành công", "success");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.error(error.message || "Failed to add Category.");
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
      endpoints.Category.replace(":id", categoryId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi cập nhật Category.");
    throw error;
  }
};

const useEditCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ categoryId, edtCategory }) => {
      const token = await getToken();
      return editCategory({ categoryId, edtCategory, token });
    },
    onSuccess: () => {
      addNotification("Category đã được cập nhật thành công", "success");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi cập nhật Category!");
    },
  });
};

const deleteCategory = async ({ categoryId, token }) => {
  if (!token) throw new Error("No token available");
  if (!categoryId) throw new Error("CategoryId is missing");

  try {
    await authApi(token).delete(endpoints.Category.replace(":id", categoryId));
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa Category.");
    throw error;
  }
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ categoryId }) => {
      const token = await getToken();
      return deleteCategory({ categoryId, token });
    },
    onSuccess: () => {
      addNotification("Category đã được xóa thành công", "success");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi xóa category!");
    },
  });
};

export {
  useCategoryList,
  useAddCategory,
  useEditCategory,
  useDeleteCategory,
  useProductByCategory,
};
