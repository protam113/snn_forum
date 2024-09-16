import React, { useState, useEffect } from "react";

const EditCommentPopup = ({ comment, onClose, onSave }) => {
  const [content, setContent] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (comment) {
      setContent(comment.content || "");
    }
  }, [comment]);

  const handleSave = async () => {
    if (!content) {
      setErrMsg("Vui lòng nhập nội dung bình luận!");
      return;
    }
    try {
      await onSave({
        id: comment.id,
        content: content,
        file: comment.file,
      });
      onClose();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-zinc-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Sửa Comment</h2>
        {errMsg && (
          <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
            <span>{errMsg}</span>
          </div>
        )}
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nhập nội dung bình luận"
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

export default EditCommentPopup;
