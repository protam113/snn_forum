import React, { useState, useEffect } from "react";
import useBanner from "../../../hooks/useBanner";

const EditBanner = ({ banner, onClose }) => {
  const [title, setTitle] = useState(banner?.title || "");
  const [description, setDescription] = useState(banner?.description || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(banner?.image || "");
  const [status, setStatus] = useState(banner?.status || "show");
  const { editBanner } = useBanner();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setDescription(banner.description);
      setStatus(banner.status || "show");
      setImagePreview(banner.image || "");
    }
  }, [banner]);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await editBanner(banner.id, { title, description, image, status });
      onClose();
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi khi cập nhật banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-5 text-center">
          Chỉnh sửa Banner
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tiêu đề
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Mô tả */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="3"
            />
          </div>

          {/* Ảnh */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ảnh
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full mb-2 border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Trạng thái */}
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Trạng thái
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="show" className="bg-green-100 text-green-800">
                Hiển thị
              </option>
              <option value="hide" className="bg-red-100 text-red-800">
                Ẩn
              </option>
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật Banner"}
            </button>
          </div>

          {/* Hiển thị lỗi */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
