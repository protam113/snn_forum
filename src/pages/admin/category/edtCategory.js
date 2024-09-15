import React, { useState, useEffect } from "react";
import { useToastDesign } from "../../../context/ToastService";

const EdtCategory = ({ category, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { addNotification } = useToastDesign();

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleSave = async () => {
    if (!categoryName) {
      setErrMsg("Vui lòng nhập tên category!"); // Cập nhật errMsg
      return;
    }
    try {
      setErrMsg(""); // Xóa thông báo lỗi khi yêu cầu thành công
      await onSave({ id: category.id, name: categoryName });
      onClose();
    } catch (error) {
      addNotification("Đã xảy ra lỗi khi cập nhật category.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        {errMsg && (
          <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
            <span>{errMsg}</span>
          </div>
        )}
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

export default EdtCategory;
