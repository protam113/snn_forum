import React from "react";
import { useGroupList } from "../../../../../hooks/GroupChat/useGroupList";
import { usePersonContext } from "../../../../../context/PersonContext";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useGroupList();
  const navigate = useNavigate();
  const { setSelectedGroup } = usePersonContext();
  console.log(data);

  if (isLoading) return <p className="text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  // Thay đổi này ở đây
  const otherGroups = data?.pages.flatMap((page) => page.GroupChats) || [];

  if (otherGroups.length === 0)
    return <p className="text-gray-500">Không có group nào.</p>;

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Đảm bảo rằng bạn đang truyền đúng group
    navigate(`/group_chat/${group.id}`); // Chuyển hướng đến chat với group.id
  };

  return (
    <div className="overflow-auto flex-1">
      {otherGroups.map((group) => (
        <div
          key={group?.id}
          onClick={() => handleGroupClick(group)}
          className="flex gap-2 hover:text-black items-center hover:bg-white-blue1 rounded p-2 cursor-pointer"
        >
          <div className="w-12 rounded-full">
            <img
              src={group?.image} // Chắc chắn rằng bạn đang sử dụng đúng thuộc tính ảnh
              alt="group-profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2">
              <p>{group?.name || "Nhóm không có tên"}</p>{" "}
              {/* Default message */}
            </div>
          </div>
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={fetchNextPage}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Tải thêm group
        </button>
      )}
      <div className="divider my-0 py-0 h-1"></div>
    </div>
  );
};

export default GroupList;
