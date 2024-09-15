import React, { useState, useEffect } from "react";
import { useToastDesign } from "../../../context/ToastService";

const EditTagPopup = ({ tag, onClose, onSave }) => {
  const [tagName, setTagName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { addNotification } = useToastDesign();

  useEffect(() => {
    if (tag) {
      setTagName(tag.name);
    }
  }, [tag]);

  const handleSave = async () => {
    if (!tagName) {
      setErrMsg("Vui lòng nhập tên tag!");
      return;
    }
    try {
      await onSave({ id: tag.id, name: tagName });
      onClose();
    } catch (error) {
      addNotification("Đã xảy ra lỗi khi cập nhật tag.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sửa Tag</h2>
        {errMsg && (
          <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
            <span>{errMsg}</span>
          </div>
        )}
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
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

export default EditTagPopup;
