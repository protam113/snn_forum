import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Loading from "../../error/load";
import EdtCategory from "./edtCategory";
import CreateCategory from "./createCategory";
import { FaArrowLeft, FaArrowRight, FaTrash } from "react-icons/fa";
import {
  useAddCategory,
  useCategoryList,
  useDeleteCategory,
  useEditCategory,
} from "../../../hooks/Product/useCategories";

const AdCategory = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCategoryList(page);
  const { mutate: addCategoryMutation } = useAddCategory();
  const { mutate: editCategoryMutation } = useEditCategory();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();

  const [showAddCategoryPopup, setshowAddCategoryPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = (newCategory) => {
    addCategoryMutation(
      { name: newCategory },
      {
        onSuccess: () => setshowAddCategoryPopup(false),
      }
    );
  };

  const handleEditCategory = (updatedCategory) => {
    editCategoryMutation(
      { categoryId: updatedCategory.id, edtCategory: updatedCategory },
      {
        onSuccess: () => setEditingCategory(null),
      }
    );
  };

  const handleDelete = (categoryId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa category này không?"
    );
    if (isConfirmed) {
      deleteCategoryMutation({ categoryId });
    }
  };

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">
        <Loading />
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );
  }

  // Safely access Categories and handle pagination
  const categories = data?.categories || [];

  return (
    <div className="banner p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-semibold">
          Quản lý thể loại (Categories)
        </h5>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setshowAddCategoryPopup(true)}
        >
          Tạo Category
        </button>
      </div>
      <hr className="border-gray-300 my-4" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-2 border-gray-300 p-2">Stt</th>
            <th className="border-2 border-gray-300 p-2">Tên </th>
            <th className="border-2 border-gray-300 p-2">Ngày Tạo</th>
            <th className="border-2 border-gray-300 p-2">Ngày Cập Nhật</th>
            <th className="border-2 border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.id} className="text-center">
                <td className="border-2 border-gray-300 p-2">{index + 1}</td>
                <td className="border-2 border-gray-300 p-2">
                  {category.name}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {new Date(category.created_date).toLocaleDateString()}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {new Date(category.updated_date).toLocaleDateString()}
                </td>
                <td className="border-2 border-gray-300 p-2 flex justify-center items-center">
                  <MdEdit
                    className="text-blue-500 cursor-pointer mx-1"
                    onClick={() => setEditingCategory(category)}
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(category.id)}
                  >
                    <FaTrash />
                  </button>
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

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mr-2"
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prev) => (prev < data?.totalPages ? prev + 1 : prev))
          }
          disabled={page === data?.totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>

      {editingCategory && (
        <EdtCategory
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleEditCategory}
        />
      )}

      {showAddCategoryPopup && (
        <CreateCategory
          onClose={() => setshowAddCategoryPopup(false)}
          onSave={handleAddCategory}
        />
      )}
    </div>
  );
};

export default AdCategory;
