import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's stylesheet
import { useTheme } from "../../../context/themeContext";
import Loading from "../../error/load";

const ProductDetail = () => {
  const { theme } = useTheme();
  const [showFullNumber, setShowFullNumber] = useState(false);
  const { id: productId } = useParams();
  const { product, loading, error } = useProduct(productId);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  // Default values if the product data is incomplete
  const price = product.price || 0;
  const formattedPrice = price.toLocaleString("vi-VN");

  // Get the categories from the product data
  const categories =
    product.categories?.map((category) => category.name).join(", ") ||
    "Chưa có";

  return (
    <div
      className={`w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={product.file || "/placeholder.svg"}
            alt={product.title || "Hình ảnh sản phẩm"}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-24 font-bold">
            {product.title || "Tiêu đề sản phẩm"}
          </h1>
          <div className="text-muted-foreground text-18">
            {/* Use ReactQuill to render the product description */}
            <div
              className={`mb-4 text-14 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              dangerouslySetInnerHTML={{ __html: product.description || "" }}
            />
          </div>
          <h2 className="text-20 font-bold">{formattedPrice} VND</h2>
        </div>
      </div>
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
              <p className="font-medium">{product.fettle || "Chưa rõ"}</p>
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
            {/* Display the seller's phone number */}
            <div>
              <p className="text-muted-foreground">Điện thoại</p>
              <p className="font-medium">
                {showFullNumber
                  ? product.phone_number || "Chưa có"
                  : product.phone_number?.slice(0, 4) + "****" || "Chưa có"}
              </p>
            </div>
            {/* Display the product categories */}
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 flex justify-end">
        <button
          onClick={() => setShowFullNumber(!showFullNumber)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          {showFullNumber ? "Ẩn số điện thoại" : "Hiện số điện thoại"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
