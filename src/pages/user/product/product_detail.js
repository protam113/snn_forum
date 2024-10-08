import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../../../context/themeContext";
import Loading from "../../error/load";
import { useProductDetail } from "../../../hooks/Product/useProduct";
import { useUser } from "../../../context/UserProvider";

const DetailItem = ({ label, value, status }) => {
  return (
    <div>
      <p className="text-muted-foreground text-sm">{label}</p>
      <p
        className={`font-medium py-1 px-2 rounded ${
          status === "in_stock"
            ? "bg-green-400 text-black"
            : status === "out_of_stock"
            ? "bg-red-400 text-black"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const ZoomableImage = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      className="relative w-[550px] h-[550px] overflow-hidden"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <div
        className={`transition-transform duration-300 ease-in-out ${
          isZoomed ? "scale-150" : "scale-100"
        }`}
        style={{
          transformOrigin: "center",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { theme } = useTheme();
  const [showFullNumber, setShowFullNumber] = useState(false);
  const { id: productId } = useParams();
  const [currentImage, setCurrentImage] = useState("");

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId);

  const { userInfo } = useUser();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  if (isError)
    return <p>{error.message || "Đã xảy ra lỗi khi tải sản phẩm!"}</p>;

  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  const price = product.price || 0;
  const formattedPrice = price.toLocaleString("vi-VN");

  const categories =
    product.categories?.map((category) => category.name).join(", ") ||
    "Chưa có";

  const isOwner = userInfo?.id === product.user?.id;

  const medias = product.medias || [];
  const mainImage = currentImage || medias[0]?.media || null;

  return (
    <div className="font-sans">
      <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-12 rounded-xl relative">
              <ZoomableImage src={mainImage} alt="Product" />
            </div>

            {medias.length > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                {medias.map((media, index) => (
                  <div
                    key={index}
                    className="w-[90px] h-20 flex items-center justify-center rounded-xl p-4 cursor-pointer"
                    onClick={() => setCurrentImage(media.media)} // Chỉnh sửa đường dẫn cho đúng
                  >
                    <img
                      src={media.media}
                      alt={`Product ${index + 1}`}
                      className="w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold text-black">
              {product.title || "Tiêu đề sản phẩm"}
            </h2>

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-black text-4xl font-semibold">
                {formattedPrice} VND
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-black">
                Chi tiết sản phẩm
              </h3>
              <div
                className={`mb-4 text-sm ${
                  theme === "dark" ? "text-black" : "text-black"
                }`}
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Thông tin người bán</h2>
              <div className="space-y-2">
                <DetailItem
                  label="Tên người bán"
                  value={product.user?.username || "Chưa rõ"}
                />
                <DetailItem
                  label="Điện thoại"
                  value={
                    showFullNumber
                      ? product.phone_number || "Chưa có"
                      : product.phone_number?.slice(0, 4) + "****" || "Chưa có"
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => setShowFullNumber(!showFullNumber)}
                type="button"
                className="min-w-[200px] px-4 py-3 bg-main-blue1 hover:bg-blue-400 text-white text-sm font-semibold rounded"
              >
                {showFullNumber ? "Ẩn số điện thoại" : "Hiện số điện thoại"}
              </button>

              {isOwner && (
                <Link
                  to={`/san_pham/${productId}/chinh_sua_san_pham`}
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-main-blue2 bg-transparent text-black text-14 font-semibold rounded"
                >
                  Chỉnh sửa sản phẩm
                </Link>
              )}
            </div>

            <div className="mt-8">
              <div className="space-y-2">
                <h2 className="text-lg font-bold">Chi tiết sản phẩm</h2>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    label="Tình trạng"
                    value={product.condition || "Chưa rõ"}
                  />
                  <DetailItem
                    label="Trạng thái"
                    value={
                      product.fettle === "in_stock"
                        ? "Còn hàng"
                        : product.fettle === "out_of_stock"
                        ? "Hết hàng"
                        : "Chưa rõ"
                    }
                    status={product.fettle}
                  />
                  <DetailItem
                    label="Vị trí"
                    value={product.location || "Chưa rõ"}
                  />
                  <DetailItem
                    label="Số lượng"
                    value={product.quantity || "Chưa rõ"}
                  />
                </div>
                <div>
                  <p className="text-muted-foreground">Danh mục</p>
                  <p className="font-medium">{categories}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
