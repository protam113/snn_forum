import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import biểu tượng xóa
import AddUserGroup from "./AddUserGroup";
import {
  useAddUserInGroup,
  useGroupUserList,
  useRemoveUserFromGroup,
} from "../../../../../hooks/GroupChat/useGroupList";

const UserChatList = ({ onClose, onSave, groupId }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useGroupUserList(groupId);
  const { mutate: addUserGroupMutation } = useAddUserInGroup();
  const [showAddUserGroupPopup, setShowAddUserGroupPopup] = useState(false);
  const { mutate: removeUserMutation } = useRemoveUserFromGroup();

  const handleAddUserGroup = (selectedUsers) => {
    addUserGroupMutation(
      { groupId, userIds: selectedUsers },
      {
        onSuccess: () => {
          setShowAddUserGroupPopup(false);
        },
      }
    );
  };

  const handleRemoveUser = (userId) => {
    removeUserMutation(
      { groupId, userIds: [userId] }, // Gửi userId dưới dạng mảng
      {
        onSuccess: () => {
          console.warm(`Người dùng ${userId} đã được xóa khỏi nhóm`);
        },
        onError: (error) => {
          console.error(`Lỗi khi xóa người dùng ${userId}:`, error.message);
        },
      }
    );
  };

  if (isLoading) return <p className="text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const groupUsers = data?.pages.flatMap((page) => page.users) || [];
  console.log(groupUsers);

  if (groupUsers.length === 0) {
    return <p className="text-gray-500">Không có người dùng nào trong nhóm.</p>;
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">
            Danh sách Người Dùng trong Nhóm
          </h2>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => setShowAddUserGroupPopup(true)}
          >
            <FaPlus className="mr-2 text-black" />
            Thêm Người Dùng
          </div>
          <div className="max-h-60 overflow-auto mb-4 bg-gray-50 p-4 rounded-lg shadow-md">
            {groupUsers.map(({ user, role }) => (
              <div
                key={user.id}
                className="flex items-center mb-2 p-2 hover:bg-gray-100 transition duration-200 rounded"
              >
                <img
                  src={user.profile_image}
                  alt={`${user.username}'s avatar`}
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <label
                    htmlFor={`user-${user.id}`}
                    className="cursor-pointer text-lg font-semibold text-gray-800"
                  >
                    {user.username || "Không có tên"}
                  </label>
                  <span className="ml-2 text-sm text-gray-600">{role}</span>
                </div>
                {role === "member" && (
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    title="Xóa người dùng"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

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
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
      {showAddUserGroupPopup && (
        <AddUserGroup
          onClose={() => setShowAddUserGroupPopup(false)}
          onSave={handleAddUserGroup}
        />
      )}
    </>
  );
};

export default UserChatList;
