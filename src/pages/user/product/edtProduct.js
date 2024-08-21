import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ReactQuill from "react-quill";
import useCategories from "../../../hooks/useCategories";
import useProduct from "../../../hooks/useProduct";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EdtProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { product, editProduct, error, loading } = useProduct(productId);
  const { categories } = useCategories();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    condition: "",
    fettle: "",
    file: [],
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
        file: product.file || [],
        location: product.location || "",
        category: product.category || [],
        description: product.description || "",
        price: product.price || "",
        phone_number: product.phone_number || "",
      });
      setSelectedFiles(Array.isArray(product.file) ? product.file : []);
    }
  }, [product]);

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

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      category: prev.category.includes(value)
        ? prev.category.filter((cat) => cat !== value)
        : [...prev.category, value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.quantity ||
      !formData.condition ||
      !formData.fettle ||
      !formData.file ||
      !formData.location ||
      !formData.category.length ||
      !formData.description ||
      !formData.phone_number ||
      !formData.price
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await editProduct({ ...formData, file: selectedFiles });
      toast.success("Sản phẩm đã được cập nhật thành công!");
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
      toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm.");
    }
  };

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
              id="file"
              name="file"
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
          <ReactQuill
            value={formData.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
            className="mb-6"
            placeholder="What's on your mind?"
            style={{ height: "10rem" }}
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
              Loại
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              multiple
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdtProduct;
