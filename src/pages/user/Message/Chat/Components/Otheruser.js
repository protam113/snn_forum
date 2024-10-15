import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserChatList } from "../../../../../hooks/Message/useGetOtherUsers";
import { usePersonContext } from "../../../../../context/PersonContext";

const OtherUsers = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, error } =
    useUserChatList();
  const navigate = useNavigate();
  const { setSelectedUser } = usePersonContext();

  if (isLoading) return <p className="text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  const otherUsers = data?.pages.flatMap((page) => page.users) || [];

  if (otherUsers.length === 0)
    return <p className="text-gray-500">Không có người dùng nào.</p>;

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/chat/${user.id}`);
  };

  return (
    <div className="overflow-auto flex-1">
      {otherUsers.map((user) => (
        <div
          key={user.id}
          onClick={() => handleUserClick(user)} // Gọi hàm khi nhấp vào người dùng
          className="flex gap-2 hover:text-black items-center hover:bg-white-blue1 rounded p-2 cursor-pointer"
        >
          <div className="w-12 rounded-full">
            <img
              src={user?.profile_image}
              alt="user-profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p>{user.username}</p> {/* Tên người dùng */}
            </div>
          </div>
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={fetchNextPage}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Tải thêm người dùng
        </button>
      )}
      <div className="divider my-0 py-0 h-1"></div>{" "}
    </div>
  );
};

export default OtherUsers;
