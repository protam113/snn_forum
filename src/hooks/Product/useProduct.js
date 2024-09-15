import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useToastDesign } from "../../context/ToastService";

// Fetch product list
const fetchProductList = async (page = 1) => {
  try {
    const response = await authApi().get(`${endpoints.Products}?page=${page}`);
    const totalPages = Math.ceil(response.data.count / 20);
    return {
      Products: response.data.results || [],
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

const useProductList = (page) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProductList(page),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

// Fetch product detail
const fetchProductDetail = async (productId) => {
  if (!productId) return null;

  try {
    const url = endpoints.ProductDetail.replace(":id", productId);
    const response = await authApi().get(url);
    return response.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

const useProductDetail = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetail(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

// Hàm thêm sản phẩm
const AddProduct = async (newProduct, token) => {
  const formData = new FormData();

  for (const key in newProduct) {
    if (Array.isArray(newProduct[key])) {
      newProduct[key].forEach((value) => formData.append(key, value));
    } else {
      formData.append(key, newProduct[key]);
    }
  }

  if (newProduct.images) {
    newProduct.images.forEach((file) => {
      formData.append("media", file);
    });
  }

  if (!token) throw new Error("No token available");

  try {
    const response = await authApi(token).post(endpoints.Products, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error adding product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async (newProduct) => {
      const token = await getToken();
      return AddProduct(newProduct, token);
    },
    onSuccess: () => {
      addNotification("Sản phẩm đã được thêm thành công", "success");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error(error.message || "Failed to add product.");
    },
  });
};

// Update product
const updateProduct = async ({ productId, edtProduct, token }) => {
  if (!token) throw new Error("No token available");

  const formData = new FormData();

  for (const key in edtProduct) {
    if (Array.isArray(edtProduct[key])) {
      edtProduct[key].forEach((value) => formData.append(key, value));
    } else {
      formData.append(key, edtProduct[key]);
    }
  }

  const response = await authApi(token).patch(
    endpoints.ProductDetail.replace(":id", productId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const useEditProduct = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ productId, edtProduct }) => {
      const token = await getToken();
      return updateProduct({ productId, edtProduct, token });
    },
    onSuccess: () => {
      addNotification("Sản phẩm đã được cập nhật thành công", "success");
      queryClient.invalidateQueries(["product"]);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi cập nhật sản phẩm!");
    },
  });
};

export { useProductList, useProductDetail, useAddProduct, useEditProduct };
