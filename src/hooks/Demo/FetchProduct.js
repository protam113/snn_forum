import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../../api/api";

const useDemoProduct = (productId) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    authApi()
      .get(endpoints.Products)
      .then((response) => {
        setProducts(response.data.results || []);
      })
      .catch(() => {
        setError("Đã xảy ra lỗi khi tải sản phẩm!");
        toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Lấy chi tiết sản phẩm nếu có productId
  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    setError(null);
    const url = endpoints.ProductDetail.replace(":id", productId);
    authApi()
      .get(url)
      .then((response) => {
        setProduct(response.data || null);
      })
      .catch(() => {
        setError("Đã xảy ra lỗi khi tải sản phẩm!");
        toast.error("Đã xảy ra lỗi khi tải sản phẩm!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return {
    products,
    product,
    loading,
    error,
  };
};

export default useDemoProduct;
