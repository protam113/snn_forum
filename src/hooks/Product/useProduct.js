import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

// Fetch product list
const fetchProductList = async () => {
  try {
    const response = await authApi().get(endpoints.Products);
    return response.data.results || [];
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    throw error;
  }
};

// Custom hook for product list
const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
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
    toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
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

  return useMutation({
    mutationFn: async (newProduct) => {
      const token = await getToken();
      return AddProduct(newProduct, token);
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được thêm thành công");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add product.");
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

  return useMutation({
    mutationFn: async ({ productId, edtProduct }) => {
      const token = await getToken();
      return updateProduct({ productId, edtProduct, token });
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được cập nhật thành công");
      queryClient.invalidateQueries(["product"]);
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi cập nhật sản phẩm!");
    },
  });
};

export { useProductList, useProductDetail, useAddProduct, useEditProduct };
