import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProductByCategory } from "../../../../hooks/Product/useCategories";
import { toast } from "react-toastify"; // Make sure to import toast for error notifications

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const CategoryProduct = () => {
  const { id: categoryId } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useProductByCategory(
    categoryId,
    page
  );
  const navigate = useNavigate();

  // Function to load more products
  const loadMore = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  // Check if data is available and contains ProductsByCategory
  const products = data?.ProductsByCategory || [];

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 px-4 py-2 rounded-md mb-4"
        >
          Quay lại
        </button>
        <h1 className="text-2xl font-bold mb-4">
          Sản phẩm theo thể loại (Category)
        </h1>
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                  to={`/san_pham/chi_tiet_san_pham/${product.id}`}
                >
                  <div className="relative h-64">
                    <img
                      src={
                        product.medias && product.medias.length > 0
                          ? product.medias[0].media
                          : "default-image-url.jpg"
                      }
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-lg font-semibold truncate">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        By {product.user.username}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-semibold">
                        {formatPrice(product.price)}
                      </span>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors text-sm">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
              {isFetching ? (
                <p>Đang tải thêm sản phẩm...</p>
              ) : (
                <button
                  onClick={loadMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Tải thêm
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No Products Found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
