import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useBanner from "../../../hooks/useBanner";

const EditBanner = ({ banner, onClose }) => {
  const [title, setTitle] = useState(banner?.title || "");
  const [description, setDescription] = useState(banner?.description || "");
  const [image, setImage] = useState(null);
  const { editBanner } = useBanner();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setDescription(banner.description);
    }
  }, [banner]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await editBanner(banner.id, { title, description, image });
      toast.success("Cập nhật banner thành công");
      onClose();
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi khi cập nhật banner");
      toast.error(err.message || "Đã xảy ra lỗi khi cập nhật banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa Banner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tiêu đề
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Ảnh
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật Banner"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditBanner;
