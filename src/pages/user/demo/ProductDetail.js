import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../context/themeContext";
import Loading from "../../error/load";
import { useProductDetail } from "../../../hooks/Product/useProduct";
import useDemoProduct from "../../../hooks/Demo/FetchProduct";

const Product_Detail = () => {
  const { theme } = useTheme();
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { id: productId } = useParams();
  const { product, loading, error } = useDemoProduct(productId);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  if (error) return <p>{error.message || "Đã xảy ra lỗi khi tải sản phẩm!"}</p>;

  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  const price = product.price || 0;
  const formattedPrice = price.toLocaleString("vi-VN");

  const categories =
    product.categories?.map((category) => category.name).join(", ") ||
    "Chưa có";

  const medias = product.medias || [];
  const totalSlides = medias.length;

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={`w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative">
        {medias.length > 0 && (
          <>
            <img
              src={medias[currentSlide].media || "/placeholder.svg"}
              alt={product.title || "Hình ảnh sản phẩm"}
              width={600}
              height={600}
              className="w-full h-auto rounded-lg object-cover"
              style={{ aspectRatio: "4/3" }}
            />
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &#9664;
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &#9654;
            </button>
          </>
        )}
      </div>

      <div className="space-y-4 mt-8">
        <h1 className="text-24 font-bold">
          {product.title || "Tiêu đề sản phẩm"}
        </h1>

        <h2 className="text-20 font-bold">{formattedPrice} VND</h2>
        <div
          className={`mb-4 text-14 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-20 font-bold">Chi tiết sản phẩm</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-20">Tình trạng</p>
                <p className="font-medium">{product.condition || "Chưa rõ"}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-20">Trạng thái</p>
                <p
                  className={`font-medium py-1 px-2 rounded ${
                    product.fettle === "in_stock"
                      ? "bg-green-400 text-white"
                      : product.fettle === "out_of_stock"
                      ? "bg-red-400 text-white"
                      : ""
                  }`}
                >
                  {product.fettle === "in_stock"
                    ? "Còn hàng"
                    : product.fettle === "out_of_stock"
                    ? "Hết hàng"
                    : "Chưa rõ"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-20">Vị trí</p>
                <p className="font-medium">{product.location || "Chưa rõ"}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-20">Số lượng</p>
                <p className="font-medium">{product.quantity || "Chưa rõ"}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Danh mục</p>
              <p className="font-medium">{categories}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-20">Thông tin người bán</h2>
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground">Tên người bán</p>
                <p className="font-medium">
                  {product.user?.username || "Chưa rõ"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Điện thoại</p>
                <p className="font-medium">
                  {showFullNumber
                    ? product.phone_number || "Chưa có"
                    : product.phone_number?.slice(0, 4) + "****" || "Chưa có"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 flex justify-end space-x-4">
          <button
            onClick={() => setShowFullNumber(!showFullNumber)}
            className="bg-blue-500 text-white text-14 font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            {showFullNumber ? "Ẩn số điện thoại" : "Hiện số điện thoại"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product_Detail;
