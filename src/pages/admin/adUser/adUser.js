import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { FaUsers, FaSearch, FaTrash, FaFileExcel } from "react-icons/fa";
import { MdGroup, MdAdd, MdPerson } from "react-icons/md";
import { toast } from "react-toastify";
import useUserSearch from "../../../hooks/useUserSearch";
import * as XLSX from "xlsx";
import { useTheme } from "../../../context/themeContext";
import useUserInfo from "../../../hooks/useUserInfo";

const AdUser = () => {
  const { theme } = useTheme();
  const { results: featuredUsers, fetchUsers } = useUserSearch();
  const navigate = useNavigate();
  const {
    groups,
    users,
    loadingGroups,
    loadingUsers,
    error,
    selectedGroup,
    setSelectedGroup,
    removeUserFromGroup,
    fetchGroups,
  } = useAdmin();
  const { userRoles } = useUserInfo();
  const [viewMode, setViewMode] = useState("all");
  const [userToRemove, setUserToRemove] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, [fetchUsers, fetchGroups]);

  const isAdmin = userRoles.includes("admin");

  const handleGroupChange = (event) => {
    const groupId = parseInt(event.target.value, 10);
    const selectedGroup = groups.find((group) => group.id === groupId);
    setSelectedGroup(selectedGroup);
    setViewMode("group");
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === "all") {
      setSelectedGroup(null);
    }
  };

  const handleRemoveUser = (user) => {
    setUserToRemove(user);
    setShowConfirm(true);
  };

  const confirmRemoveUser = async () => {
    if (userToRemove && selectedGroup) {
      try {
        await removeUserFromGroup(userToRemove.id, selectedGroup.id);
        setShowConfirm(false);
        setUserToRemove(null);
      } catch (error) {
        console.error("Error removing user:", error);
        toast.error("Có lỗi xảy ra khi xóa người dùng.");
      }
    } else {
      toast.error("Người dùng hoặc nhóm không được chọn");
    }
  };

  const cancelRemoveUser = () => {
    setShowConfirm(false);
    setUserToRemove(null);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(featuredUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    // Tạo file Excel và tải xuống
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? " text-gray-300" : " text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-20 font-bold flex items-center gap-2">
          <FaUsers className="text-blue-500" /> Quản lý người dùng
        </h1>
        <div className="flex gap-4">
          {isAdmin && ( // Chỉ hiển thị nút nếu người dùng là admin
            <button
              onClick={exportToExcel}
              disabled={loadingUsers || featuredUsers.length === 0}
              className={`px-4 text-16 py-2 rounded-lg flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-green-600 text-gray-900"
                  : "bg-green-500 text-white"
              }`}
            >
              <FaFileExcel className="text-xl" /> {/* Thêm biểu tượng */}
              Xuất Excel
            </button>
          )}
          <button
            onClick={() =>
              navigate("/admin/quan_ly_nguoi_dung/them_nguoi_dung")
            }
            className={`px-4 text-16 py-2 rounded-lg flex items-center gap-2 ${
              theme === "dark"
                ? "bg-blue-600 text-gray-900"
                : "bg-blue-500 text-white"
            }`}
          >
            <MdAdd />
            Thêm người dùng
          </button>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleViewModeChange("all")}
          className={`px-4 py-2 text-16 rounded-lg font-semibold flex items-center gap-2 ${
            viewMode === "all"
              ? "bg-blue-500 text-white"
              : theme === "dark"
              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          <FaSearch />
          Xem tất cả
        </button>
        <button
          onClick={() => handleViewModeChange("group")}
          className={`px-4 py-2 text-16 rounded-lg font-semibold flex items-center gap-2 ${
            viewMode === "group"
              ? "bg-blue-500 text-white"
              : theme === "dark"
              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          <MdGroup />
          Xem theo nhóm
        </button>
      </div>

      {viewMode === "group" && (
        <div className="mb-6">
          <label className="block text-14 font-medium mb-2">Chọn nhóm:</label>
          <select
            onChange={handleGroupChange}
            defaultValue=""
            className={`border border-gray-300 rounded-lg p-2 w-full ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-900"
            }`}
          >
            <option value="">Chọn nhóm</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        {loadingGroups && <p className="text-blue-500">Loading groups...</p>}
        {loadingUsers && <p className="text-blue-500">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-14">
          {users.map((user) => (
            <li
              key={user.id}
              className={`bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center text-center ${
                theme === "dark" ? " border-gray-700" : ""
              }`}
            >
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.username}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
              ) : (
                <MdPerson
                  className="w-24 h-24 text-gray-500 mb-4"
                  aria-label="Default user icon"
                />
              )}
              <p className="text-16 font-semibold">{user.username}</p>
              <p className="text-gray-600">
                {user.first_name} {user.last_name}
              </p>
              <button
                onClick={() => handleRemoveUser(user)}
                className={`mt-4 ${
                  theme === "dark"
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-500 hover:text-red-700"
                }`}
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            className={`bg-white p-6 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-700" : ""
            }`}
          >
            <p className="text-lg font-semibold mb-4">
              Bạn có chắc chắn muốn xóa người dùng này?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmRemoveUser}
                className={`px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-red-600 text-gray-900"
                    : "bg-red-500 text-white"
                }`}
              >
                Xóa
              </button>
              <button
                onClick={cancelRemoveUser}
                className={`px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-600 text-gray-300"
                    : "bg-gray-300 text-gray-900"
                }`}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdUser;
