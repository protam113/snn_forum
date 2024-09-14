import React from "react";
import { FaTrash } from "react-icons/fa";

const ConfirmationDialog = ({ onConfirm, onCancel, theme }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-opacity-50 ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-800"
    }`}
  >
    <div
      className={`bg-white rounded-lg shadow-lg p-6 ${
        theme === "dark" ? "bg-gray-800 text-gray-300" : "text-gray-900"
      }`}
    >
      <h2 className="text-lg font-bold flex items-center gap-2">
        <FaTrash /> Xác nhận xóa
      </h2>
      <p className="my-4">Bạn có chắc chắn muốn xóa người dùng này không?</p>
      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className={`px-4 py-2 rounded-lg font-semibold ${
            theme === "dark"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Xóa
        </button>
        <button
          onClick={onCancel}
          className={`px-4 py-2 rounded-lg font-semibold ${
            theme === "dark"
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationDialog;
