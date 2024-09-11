import React, { useState } from "react";

const CreateCategory = ({ onClose, onSave }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleSave = async () => {
    if (!newCategory) {
      return;
    }
    try {
      await onSave(newCategory);
      onClose();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Category Name:
          </label>
          <input
            id="categoryName"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Lưu
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
