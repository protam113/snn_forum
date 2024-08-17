import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import useCategories from "../../../hooks/useCategories";
import Loading from "../../error/load";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EdtCategory from "./edtCategory";

const AdCategory = () => {
  const { categories, loading, error, handleDeleteCategory } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateCategory = () => {
    navigate("/admin/the_loai/tao_the_loai");
  };

  const handleDelete = async (categoryId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      try {
        await handleDeleteCategory(categoryId);
        toast.success("Category deleted successfully");
      } catch (err) {
        toast.error("An error occurred while deleting the category");
      }
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="banner p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-semibold">
          Quản lý thể loại (Categories)
        </h5>
        <button
          className="bg-custom-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          onClick={handleCreateCategory}
        >
          Tạo Categories
        </button>
      </div>
      <hr className="border-gray-300 my-4" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Stt</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Created_at</th>
            <th className="border p-2">Updated_date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  {new Date(category.created_date).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {new Date(category.updated_date).toLocaleDateString()}
                </td>
                <td className="border p-2 flex justify-center items-center">
                  <MdEdit
                    className="text-blue-500 cursor-pointer mx-1"
                    onClick={() => handleEdit(category)}
                  />
                  <MdDelete
                    className="text-red-500 cursor-pointer mx-1"
                    onClick={() => handleDelete(category.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No Categories Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && selectedCategory && (
        <EdtCategory category={selectedCategory} onClose={closeModal} />
      )}
    </div>
  );
};

export default AdCategory;
