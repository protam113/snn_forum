import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProduct,
  useProductDetail,
} from "../../../hooks/Product/useProduct";
import CategoryList from "./components/categoryList";

const EdtProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(productId);
  const fileInputRef = useRef(null);
  const { mutate: editProductMutation } = useEditProduct();

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    condition: "",
    fettle: "",
    media: [],
    location: "",
    category: [],
    description: "",
    price: "",
    phone_number: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        quantity: product.quantity || "",
        condition: product.condition || "",
        fettle: product.fettle || "",
        media: product.file || [],
        location: product.location || "",
        category: product.category || [],
        description: product.description || "",
        price: product.price || "",
        phone_number: product.phone_number || "",
      });
      setSelectedFiles(Array.isArray(product.media) ? product.media : []);
    }
  }, [product]);

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is undefined.");
      toast.error("Không tìm thấy sản phẩm.");
      navigate(-1);
    }
  }, [productId, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...selectedFiles, ...files].slice(0, 4);
    setSelectedFiles(updatedFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (newCategories) => {
    setFormData((prev) => ({
      ...prev,
      category: newCategories,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      toast.error("ID sản phẩm không hợp lệ.");
      return;
    }

    try {
      await editProductMutation({
        productId,
        edtProduct: { ...formData, media: selectedFiles },
      });
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Chỉnh Sửa Sản Phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="flex flex-col gap-4">
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Upload Images (max 4)
          </label>
          <div className="relative flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
            <input
              id="media"
              name="media"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              ref={fileInputRef}
            />
            <AiOutlinePlus className="text-gray-500" size={24} />
            <span className="text-gray-500">Chọn hình ảnh</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                >
                  <AiOutlineDelete className="text-red-500" size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Tên Sản Phẩm
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium mb-1"
            >
              Số Lượng
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Chi Tiết Sản Phẩm
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mb-6 w-full p-2 border border-gray-300 rounded"
            placeholder="What's on your mind?"
            rows={4}
            style={{ resize: "vertical" }} // Cho phép người dùng thay đổi kích thước theo chiều dọc
          />
        </div>
        <hr className="mt-4" />
        {/* Additional Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium mb-1"
            >
              Tình Trạng
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Chọn tình trạng</option>
              <option value="new">Mới</option>
              <option value="used">Đã Sử Dụng</option>
            </select>
          </div>
          <div>
            <label htmlFor="fettle" className="block text-sm font-medium mb-1">
              Trạng Thái
            </label>
            <select
              id="fettle"
              name="fettle"
              value={formData.fettle}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Chọn Chất Lượng</option>
              <option value="in_stock">Còn hàng</option>
              <option value="out_of_stock">Hết hàng</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Vị Trí
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Danh Mục
            </label>
            <CategoryList
              selectedCategories={formData.category}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Giá
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium mb-1"
            >
              Số Điện Thoại
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Cập Nhật
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdtProduct;
