import React from "react";
import useBanner from "../../../hooks/useBanner";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { adminBanner, loading, error } = useBanner();
  const navigate = useNavigate();

  const handleCreateBanner = () => {
    navigate("/admin/banners/tao_banner");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 md:px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-semibold">Quản lý banner (Banner)</h5>
        <button
          className="bg-custom-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          onClick={handleCreateBanner}
        >
          Tạo Categories
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
              <tr key={banner.id} className="border-b">
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
                <td className="py-2 px-4">
                  {/* Add actions like edit or delete */}
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline ml-4">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No Banners Available</p>
      )}
    </div>
  );
};

export default Banner;
