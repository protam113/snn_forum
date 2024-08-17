import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import useCategories from "../../../hooks/useCategories";
import { toast } from "react-toastify";

const EdtCategory = ({ category, onClose }) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const { editCategory } = useCategories();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await editCategory(category.id, { name: categoryName });
      toast.success("Category updated successfully");
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred while updating the category");
      toast.error(
        err.message || "An error occurred while updating the category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              aria-required="true"
              aria-label="Category Name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EdtCategory;
