// components/AllProduct.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import { useProductList } from "../../../hooks/Product/useProduct";
import Loading from "../../error/load";
import ProductSidebar from "./components/productSidebar";
import { useUserCategoryList } from "../../../hooks/Product/useUserCategory";

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

  const { data: products, error, isLoading } = useProductList();
  const { productsByCategory, fetchProductByCategory } = useCategories();

  const { data: categories } = useUserCategoryList();

  useEffect(() => {
    if (categoryId || selectedCategories.length > 0) {
      fetchProductByCategory(categoryId || selectedCategories, priceOrder);
    }
  }, [categoryId, selectedCategories, priceOrder, fetchProductByCategory]);

  const productsToDisplay =
    categoryId || selectedCategories.length > 0 ? productsByCategory : products;

  const handleFilterChange = (categories, priceOrder) => {
    setSelectedCategories(categories);
    setPriceOrder(priceOrder);
    setCategoryId(null);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    setSelectedCategories([]);
    setPriceOrder("asc");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
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
            {productsToDisplay.map((product) => (
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
                    <button className="bg-custom-red text-white px-2 py-1 rounded-md font-semibold hover:bg-red-700 transition-colors text-14">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
