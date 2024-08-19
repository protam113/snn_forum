import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ReactQuill from "react-quill";
import useCategories from "../../../hooks/useCategories";
import useProduct from "../../../hooks/useProduct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { categories } = useCategories();
  const { handleAddProduct, error, loading, fileInputRef } = useProduct();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [fettle, setFettle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    if (files.length + selectedFiles.length <= 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      toast.error("You can only upload up to 4 files.");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.trim() !== "") {
      setPrice(value);
    } else {
      setPrice(""); // Or set an error message
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategory((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((cat) => cat !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numericPrice = parseFloat(price); // Convert to a float number
    if (isNaN(numericPrice)) {
      toast.error("Price is not a valid number");
      return;
    }

    try {
      await handleAddProduct(
        event,
        title,
        quantity,
        description,
        condition,
        fettle,
        location,
        category,
        phone_number,
        numericPrice,
        () => {
          toast.success("Product created successfully!");
          navigate("/san_pham");
        },
        () => {}
      );
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while creating the product");
    }
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
            {selectedFiles.length > 0 &&
              selectedFiles.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
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
                Tên Sản Phẩm
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter product title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
              value={description}
              onChange={setDescription}
              className="mb-6"
              placeholder="What's on your mind?"
              style={{ height: "10rem" }}
            />
          </div>
          <hr className="border-white my-6" />
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
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Chọn tình trạng</option>
                <option value="new">Mới</option>
                <option value="used">Đã Sử Dụng</option>
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
                value={fettle}
                onChange={(e) => setFettle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Chọn Chất Lượng</option>
                <option value="in_stock">Tốt</option>
                <option value="out_of_stock">Bình Thường</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
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
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="number"
                placeholder="Enter phone number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Category</label>
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center mb-2">
                <input
                  id={`category-${cat.id}`}
                  name="category"
                  type="checkbox"
                  value={cat.id} // Use category id
                  checked={category.includes(cat.id)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label htmlFor={`category-${cat.id}`} className="text-sm">
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Giá
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={handlePriceChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Đang Tạo..." : "Tạo Sản Phẩm"}
            </button>
          </div>
        </div>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default CreateProduct;
