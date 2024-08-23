import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import useBanner from "../../../hooks/useBanner";
import { useNavigate } from "react-router-dom";
import Loading from "../../error/load";
import { toast } from "react-toastify";
import EditBanner from "./edtBanner";

const Banner = () => {
  const { adminBanner, loading, error, deleteBanner } = useBanner();
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateBanner = () => {
    navigate("/admin/banners/tao_banner");
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setShowModal(true);
  };

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa banner này?")) {
      try {
        await deleteBanner(bannerId);
        toast.success("Đã xóa banner thành công");
      } catch (err) {
        toast.error("Đã xảy ra lỗi khi xóa banner");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBanner(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-semibold">Quản lý banner (Banner)</h5>
        <button
          className="bg-custom-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          onClick={handleCreateBanner}
        >
          Tạo Banner
        </button>
      </div>
      {adminBanner.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-2 px-4 border-r">ID</th>
              <th className="py-2 px-4 border-r">Title</th>
              <th className="py-2 px-4 border-r">Description</th>
              <th className="py-2 px-4 border-r">Image</th>
              <th className="py-2 px-4 border-r">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminBanner.map((banner) => (
              <tr key={banner.id} className="w-full bg-gray-100 border-b">
                <td className="py-2 px-4 border-r">{banner.id}</td>
                <td className="py-2 px-4 border-r">{banner.title}</td>
                <td className="py-2 px-4 border-r">
                  {banner.description || "No description"}
                </td>
                <td className="py-2 px-4 border-r">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-r">{banner.status}</td>
                <td className="py-2 px-4 flex items-center justify-center">
                  <MdEdit
                    className="text-blue-500 cursor-pointer mx-1"
                    onClick={() => handleEditBanner(banner)}
                  />
                  <MdDelete
                    className="text-red-500 cursor-pointer mx-1"
                    onClick={() => handleDeleteBanner(banner.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No Banners Available</p>
      )}
      {showModal && selectedBanner && (
        <EditBanner banner={selectedBanner} onClose={closeModal} />
      )}
    </div>
  );
};

export default Banner;
