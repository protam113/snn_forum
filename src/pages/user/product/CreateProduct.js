import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
//  icon
import ReactQuill from "react-quill";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    description: "",
    condition: "",
    fettle: "",
    status: "",
    location: "",
    category: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files].slice(0, 4), // Limit to 4 images
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Product data submitted:", formData);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Tạo Sản Phẩm</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Image Upload Section */}
        <div className="flex flex-col gap-4">
          <label htmlFor="images" className="block text-sm font-medium mb-1">
            Upload Images (max 4)
          </label>
          <div className="relative flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
            <input
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <AiOutlinePlus className="text-gray-500" size={24} />
            <span className="text-gray-500">Chọn hình ảnh</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {formData.images.length > 0 &&
              formData.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
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
        <div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Tên Sản Phảm
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter product title"
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
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Chi Tiết Sản Phẩm
            </label>
            <ReactQuill
              value={formData.description}
              onChange={handleChange}
              className="mb-6"
              placeholder="What's on your mind?"
              style={{ height: "10rem" }}
            />
          </div>
          <hr className="border-white my-6" />{" "}
          <div className="grid grid-cols-2 gap-6 mb-6">
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
                <option value="refurbished">Tân Trang</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="fettle"
                className="block text-sm font-medium mb-1"
              >
                Chất Lượng
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
                <option value="good">Tốt</option>
                <option value="fair">Bình Thường</option>
                <option value="poor">Trung Bình</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-1"
              >
                Trạng Thái
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select status</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home-decor">Home Decor</option>
              <option value="toys">Toys</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Create Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
