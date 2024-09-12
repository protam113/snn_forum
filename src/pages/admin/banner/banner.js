import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Loading from "../../error/load";
import { toast } from "react-toastify";
import EditBanner from "./edtBanner";
import { useAdminBanner } from "../../../hooks/Banner/useAdminBanner";
import useBanner from "../../../hooks/useBanner";

const Banner = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useAdminBanner();
  const { deleteBanner } = useBanner();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Đã xảy ra lỗi khi tải Banner
      </div>
    );
  }

  const banners = data?.pages.flatMap((page) => page.adminBanner) || [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Quản lý Banner</h1>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors"
          onClick={handleCreateBanner}
        >
          Tạo Banner
        </button>
      </div>
      {banners.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr className="border-b">
                  <th className="py-3 px-4 text-left text-gray-600">ID</th>
                  <th className="py-3 px-4 text-left text-gray-600">Title</th>
                  <th className="py-3 px-4 text-left text-gray-600">
                    Description
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">Image</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-center text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 border-r text-gray-800">
                      {banner.id}
                    </td>
                    <td className="py-2 px-4 border-r text-gray-800">
                      {banner.title}
                    </td>
                    <td className="py-2 px-4 border-r text-gray-800">
                      {banner.description || "No description"}
                    </td>
                    <td className="py-2 px-4 border-r">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-32 h-32 object-cover rounded-md border border-gray-300"
                      />
                    </td>
                    <td className="py-2 px-4 border-r ">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-sm font-medium rounded-full ${
                          banner.status === "hide"
                            ? "text-red-800 bg-red-100"
                            : "text-green-800 bg-green-100"
                        }`}
                      >
                        {banner.status === "hide" ? "Ẩn" : "Hiện"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-r flex items-center justify-center space-x-2">
                      <MdEdit
                        className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => handleEditBanner(banner)}
                      />
                      <MdDelete
                        className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                        onClick={() => handleDeleteBanner(banner.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {hasNextPage && (
            <button
              className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
              onClick={() => fetchNextPage()}
            >
              Tải thêm
            </button>
          )}
        </>
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
