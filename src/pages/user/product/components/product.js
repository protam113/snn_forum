import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../../error/load";
import { useProductList } from "../../../../hooks/Product/useProduct";

// Hàm định dạng giá tiền
const formatPrice = (price) => {
  if (!price) return "0 đ";
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
  return `${formattedPrice} đ`;
};

const Product = () => {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // Giới hạn hiển thị chỉ 12 sản phẩm
  const displayedProducts = products.slice(0, 12);

  return (
    <>
      {displayedProducts.map((product) => {
        // Lấy hình ảnh đầu tiên từ mảng medias
        const firstImage =
          product.medias.length > 0
            ? product.medias[0].media
            : "https://via.placeholder.com/150";

        return (
          <Link
            key={product.id}
            className="bg-background rounded-lg shadow-lg overflow-hidden flex flex-col"
            to={`/san_pham/chi_tiet_san_pham/${product.id}`}
          >
            <div className="relative h-64">
              <img
                src={firstImage}
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
        );
      })}
    </>
  );
};

export default Product;
