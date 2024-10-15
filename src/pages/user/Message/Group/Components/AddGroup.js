import { useState } from "react";

const AddGroup = ({ onClose, onSave }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);

  const handleSave = async () => {
    if (!groupName || !groupImage) {
      alert("Vui lòng nhập tên nhóm và chọn hình ảnh!");
      return;
    }

    try {
      const newGroup = { name: groupName, image: groupImage };
      await onSave(newGroup);
      onClose();
    } catch (error) {
      console.error("Error while saving group:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra định dạng ảnh
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        alert("Vui lòng chọn file ảnh hợp lệ (jpg, png, gif)!");
        return;
      }
      setGroupImage(file); // Lưu file ảnh được chọn
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Tạo Group Chat Mới</h3>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nhập tên nhóm"
          className="border p-2 mb-4 w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 mb-4 w-full"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
