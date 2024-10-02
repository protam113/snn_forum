import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import { useProductList } from "../../../hooks/Product/useProduct";
import Loading from "../../error/load";
import ProductSidebar from "./components/productSidebar";

const formatPrice = (price) => {
  if (!price) return "0 đ";
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
  return `${formattedPrice} đ`;
};

const AllProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceOrder, setPriceOrder] = useState("asc");
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: productsData,
    error,
    isLoading,
    isFetching,
  } = useProductList(page);
  const { productsByCategory, fetchProductByCategory } = useCategories();

  useEffect(() => {
    if (categoryId || selectedCategories.length > 0) {
      fetchProductByCategory(categoryId || selectedCategories, priceOrder);
    }
  }, [categoryId, selectedCategories, priceOrder, fetchProductByCategory]);

  const productsToDisplay =
    categoryId || selectedCategories.length > 0
      ? productsByCategory
      : productsData
      ? productsData.Products
      : [];

  const totalPages = productsData ? productsData.totalPages : 1; // Get the total pages

  const handleFilterChange = (categories, priceOrder) => {
    setSelectedCategories(categories);
    setPriceOrder(priceOrder);
    setCategoryId(null);
    setPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    setSelectedCategories([]);
    setPriceOrder("asc");
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>{error.message || "Đã xảy ra lỗi!"}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex">
        <ProductSidebar
          onFilterChange={handleFilterChange}
          onCategoryChange={handleCategoryChange}
          className="w-1/4"
        />
        <div className="w-3/4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-700 hover:text-blue-400 px-4 py-2 rounded-md transition-colors"
          >
            Quay lại
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsToDisplay.length > 0 ? (
              productsToDisplay.map((product) => (
                <Link
                  key={product.id}
                  className="bg-background rounded-lg shadow-lg overflow-hidden flex flex-col"
                  to={`/san_pham/chi_tiet_san_pham/${product.id}`}
                >
                  <div className="relative h-64">
                    <img
                      src={
                        product.medias.length > 0
                          ? product.medias[0].media
                          : "https://via.placeholder.com/150"
                      }
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-16 font-semibold truncate">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground text-14">
                        By {product.user.username}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-14 font-semibold">
                        {formatPrice(product.price)}
                      </span>
                      <button className="bg-main-blue2 text-white px-2 py-1 rounded-md font-semibold hover:bg-red-700 transition-colors text-14">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center w-full">No products available</p>
            )}
          </div>
          <button
            onClick={handleLoadMore}
            disabled={isFetching || page >= totalPages}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isFetching
              ? "Đang tải..."
              : page >= totalPages
              ? "Đã tải hết"
              : "Tải thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
