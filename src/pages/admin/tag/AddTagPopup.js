import React, { useState } from "react";

const AddTagPopup = ({ onClose, onSave }) => {
  const [newTag, setNewTag] = useState("");

  const handleSave = async () => {
    if (!newTag) {
      return;
    }
    try {
      await onSave(newTag);
      onClose();
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Thêm Tag Mới</h2>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nhập tên tag"
          className="border p-2 w-full mb-4"
        />
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

export default AddTagPopup;
