import React, { useRef, useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import useCategories from "../../../hooks/useCategories";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Toolbar from "../../../components/design/Toolbar";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import { useTheme } from "../../../context/themeContext";
import { useAddProduct } from "../../../hooks/Product/useProduct";

const CreateProduct = () => {
  const { categories } = useCategories();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [fettle, setFettle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const { mutate: addProductMutation } = useAddProduct();

  useEffect(() => {
    // Clean up object URLs to avoid memory leaks
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  const handleInsert = (text) => {
    setDescription((prev) => prev + text);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file, // Save the file object for FormData
      preview: URL.createObjectURL(file), // Create a preview URL
    }));

    if (files.length + selectedFiles.length <= 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      toast.error("You can only upload up to 4 files.");
    }
  };

  const handleRemoveImage = (index) => {
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(selectedFiles[index].preview);
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

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.trim() !== "") {
      setPrice(value);
    } else {
      setPrice(""); // Or set an error message
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      toast.error("Price is not a valid number");
      return;
    }

    const newProductData = {
      title,
      quantity,
      description: marked(description),
      condition,
      fettle,
      location,
      category,
      price: numericPrice,
      phone_number,
      images: selectedFiles.map((file) => file.file),
    };

    setLoading(true);
    try {
      await addProductMutation(newProductData, {
        onSuccess: () => {
          navigate("/san_pham");
        },
        onError: () => {
          toast.error("Failed to add product.");
        },
      });
    } catch (error) {
      toast.error("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "0 đ";
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
    return `${formattedPrice} đ`;
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
          <div className="relative flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg  cursor-pointer  transition-colors duration-200">
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
            <div>
              <Toolbar onInsert={handleInsert} />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className={`w-full p-2 border rounded-md ${
                  theme === "dark"
                    ? "bg-zinc-700 text-white border-zinc-600"
                    : "bg-white text-black border-zinc-800"
                }`}
              />
              <div className="mt-4 white-space-pre">
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            </div>
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
                Vị Trí
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
            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-1"
              >
                Danh Mục
              </label>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center mb-2">
                  <input
                    id={`category-${cat.id}`}
                    name="category"
                    type="checkbox"
                    value={cat.id}
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
            <p className="mt-2 text-lg font-semibold">{formatPrice(price)}</p>
          </div>
          <div className="mb-6">
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
              placeholder="Enter phone number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
