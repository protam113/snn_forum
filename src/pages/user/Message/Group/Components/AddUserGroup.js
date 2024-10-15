import React, { useState } from "react";
import { useUserChatList } from "../../../../../hooks/Message/useGetOtherUsers";

const AddUserGroup = ({ onClose, onSave }) => {
  const [selectedUsers, setSelectedUsers] = useState([]); // State để lưu người dùng đã chọn
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useUserChatList();

  // Hàm xử lý chọn người dùng
  const handleUserSelection = (userId) => {
    setSelectedUsers(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // Bỏ chọn nếu đã chọn
          : [...prevSelected, userId] // Thêm nếu chưa chọn
    );
  };

  // Updated handleSave function
  const handleSave = () => {
    if (selectedUsers.length === 0) {
      return; // Không có người dùng nào được chọn
    }

    onSave(selectedUsers); // Pass the selected users' IDs
    onClose(); // Close the modal after saving
  };

  if (isLoading) return <p className="text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const otherUsers = data?.pages.flatMap((page) => page.users) || [];

  if (otherUsers.length === 0)
    return <p className="text-gray-500">Không có người dùng nào.</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Thêm Người Dùng</h2>

        {/* Hiển thị danh sách người dùng */}
        <div className="max-h-60 overflow-auto mb-4">
          {otherUsers.map((user) => (
            <div key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`user-${user.id}`}
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelection(user.id)}
                className="mr-2"
              />
              <label htmlFor={`user-${user.id}`} className="cursor-pointer">
                {user.username || "Không có tên"}
              </label>
            </div>
          ))}
        </div>

        {/* Nút tải thêm người dùng nếu có thêm trang */}
        {hasNextPage && (
          <button
            onClick={fetchNextPage}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Tải thêm người dùng
          </button>
        )}

        <div className="flex justify-end mt-4">
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

export default AddUserGroup;
