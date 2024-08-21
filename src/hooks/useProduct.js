import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useProduct = (productId) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const { getToken } = useAuth();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi().get(endpoints.Products);
      setProducts(response.data.results || []);
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải sản phẩm!");
      toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);
    try {
      const url = endpoints.ProductDetail.replace(":id", productId);
      const response = await authApi().get(url);
      setProduct(response.data || null);
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải sản phẩm!");
      toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const handleAddProduct = useCallback(
    async (
      event,
      title,
      quantity,
      description,
      condition,
      fettle,
      location,
      category,
      phone_number,
      price,
      onSuccess,
      onClose
    ) => {
      event.preventDefault();
      setLoading(true);

      try {
        const token = await getToken();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("quantity", quantity);
        formData.append("description", description);
        formData.append("condition", condition);
        formData.append("fettle", fettle);
        formData.append("location", location);

        if (Array.isArray(category)) {
          category.forEach((catId) => {
            formData.append("category", catId);
          });
        } else {
          formData.append("category", category);
        }

        formData.append("phone_number", phone_number);
        formData.append("price", price);

        if (fileInputRef.current?.files.length > 0) {
          Array.from(fileInputRef.current.files).forEach((file) => {
            formData.append("file", file);
          });
        }

        try {
          const response = await authApi(token).post(
            endpoints.Products,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          const createdProduct = response.data;
          setProducts((prevProducts) => [...prevProducts, createdProduct]);
          toast.success("Sản phẩm đã được thêm thành công");
          if (onSuccess) onSuccess();
          if (onClose) onClose();
        } catch (err) {
          if (err.response?.status === 401) {
            const newToken = await getToken();
            if (newToken) {
              const response = await authApi(newToken).post(
                endpoints.Products,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
              const createdProduct = response.data;
              setProducts((prevProducts) => [...prevProducts, createdProduct]);
              toast.success("Sản phẩm đã được thêm thành công");
              if (onSuccess) onSuccess();
              if (onClose) onClose();
            } else {
              toast.error("Failed to refresh token");
            }
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error(
          "Error adding product:",
          err.response?.data || err.message
        );
        toast.error(
          err.response?.data?.detail || "Đã xảy ra lỗi khi thêm sản phẩm"
        );
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  useEffect(() => {
    fetchProducts();
    fetchProduct();
  }, [fetchProducts, fetchProduct]);

  const editProduct = async (edtProduct) => {
    try {
      const token = await getToken();
      if (!token) {
        setError("No token available");
        return;
      }
      const response = await authApi(token).patch(
        endpoints.ProductDetail.replace(":id", productId),
        edtProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProduct(response.data);
    } catch (err) {
      console.error("Lỗi khi cập nhật sản phẩm!", err);
      toast.error("Lỗi khi cập nhật sản phẩm!");
    }
  };

  return {
    products,
    fileInputRef,
    product,
    loading,
    error,
    handleAddProduct,
    editProduct,
  };
};

export default useProduct;
