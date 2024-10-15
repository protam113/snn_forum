import { useState } from "react";
import GroupList from "./Components/OtherGroups";
import AddGroup from "./Components/AddGroup";
import { useAddGroup } from "../../../../hooks/GroupChat/useGroupList";
import { Link } from "react-router-dom";

const GroupSidebar = () => {
  const [showUserGroupPopup, setShowUserGroupPopup] = useState(false);
  const { mutate: addGroup } = useAddGroup();

  const handleAddGroup = async (newGroup) => {
    try {
      await addGroup(newGroup);
      setShowUserGroupPopup(false);
    } catch (error) {
      console.error("Failed to add group:", error);
      alert("Thêm nhóm thất bại. Vui lòng thử lại."); // Thông báo lỗi cho người dùng
    }
  };

  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col h-full">
        <div className="flex items-center mb-2">
          <h3 className="text-md font-medium mr-2">Người Nhóm khác</h3>

          <Link
            to="/chat"
            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Chat
          </Link>
        </div>
        <button
          onClick={() => setShowUserGroupPopup(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600 transition"
        >
          Tạo Group Chat
        </button>

        <GroupList />
      </div>
      {showUserGroupPopup && (
        <AddGroup
          onClose={() => setShowUserGroupPopup(false)}
          onSave={handleAddGroup} // Truyền handleAddGroup
        />
      )}
    </>
  );
};

export default GroupSidebar;
