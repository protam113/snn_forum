import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaSearch, FaFileExcel } from "react-icons/fa";
import { MdGroup, MdAdd } from "react-icons/md";
import * as XLSX from "xlsx";
import { useTheme } from "../../../context/themeContext";
import useAdmin from "../../../hooks/useAdmin";
import useUserInfo from "../../../hooks/useUserInfo";
import { useGroups } from "../../../hooks/Admin/useGroups";
import { useAdminUser } from "../../../hooks/Admin/useAdminUser";
import UserList from "./UserList";
import ConfirmationDialog from "./ConfirmationDialog";
import { useToastDesign } from "../../../context/ToastService";

const AdUser = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    users,
    loadingUsers,
    error,
    selectedGroup,
    setSelectedGroup,
    removeUserFromGroup,
  } = useAdmin();
  const { data: groups, isLoading } = useGroups();
  const { userRoles } = useUserInfo();
  const { data = { pages: [] } } = useAdminUser();
  const { addNotification } = useToastDesign();

  const [viewMode, setViewMode] = useState("all");
  const [userToRemove, setUserToRemove] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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
        console.error("Có lỗi xảy ra khi xóa người dùng:", error);
      }
    } else {
      addNotification("Người dùng hoặc nhóm không được chọn", "error");
    }
  };

  const cancelRemoveUser = () => {
    setShowConfirm(false);
    setUserToRemove(null);
  };

  const exportToExcel = () => {
    if (!data || !data.pages) {
      console.error("Data is not properly initialized.");
      return;
    }

    const allUsers = data.pages.flatMap((page) => page.results || []);
    const ws = XLSX.utils.json_to_sheet(allUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "text-gray-300" : "text-gray-900"
      }`}
    >
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaUsers className="text-blue-500" /> Quản lý người dùng
        </h1>
        <div className="flex gap-4">
          {isAdmin && (
            <button
              onClick={exportToExcel}
              disabled={loadingUsers || !data?.pages?.length}
              className={`px-4 text-lg py-2 rounded-lg flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-green-600 text-gray-900"
                  : "bg-green-500 text-white"
              }`}
            >
              <FaFileExcel className="text-xl" /> Xuất Excel
            </button>
          )}
          <button
            onClick={() =>
              navigate("/admin/quan_ly_nguoi_dung/them_nguoi_dung")
            }
            className={`px-4 text-lg py-2 rounded-lg flex items-center gap-2 ${
              theme === "dark"
                ? "bg-blue-600 text-gray-900"
                : "bg-blue-500 text-white"
            }`}
          >
            <MdAdd /> Thêm người dùng
          </button>
        </div>
      </header>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => handleViewModeChange("all")}
          className={`px-4 py-2 text-lg rounded-lg font-semibold flex items-center gap-2 ${
            viewMode === "all"
              ? "bg-blue-500 text-white"
              : theme === "dark"
              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          <FaSearch /> Xem tất cả
        </button>
        <button
          onClick={() => handleViewModeChange("group")}
          className={`px-4 py-2 text-lg rounded-lg font-semibold flex items-center gap-2 ${
            viewMode === "group"
              ? "bg-blue-500 text-white"
              : theme === "dark"
              ? "bg-gray-600 text-gray-300 hover:bg-gray-500"
              : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          <MdGroup /> Xem theo nhóm
        </button>
      </div>

      {viewMode === "group" && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Chọn nhóm:</label>
          <select
            onChange={handleGroupChange}
            defaultValue=""
            className={`border border-gray-300 rounded-lg p-2 w-full ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-white text-gray-900"
            }`}
          >
            <option value="">Tất cả người dùng có trong group</option>
            {groups && groups.length > 0 ? (
              groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))
            ) : (
              <option disabled>Không có nhóm</option>
            )}
          </select>
        </div>
      )}

      <div>
        {isLoading && <p className="text-blue-500">Loading groups...</p>}
        {loadingUsers && <p className="text-blue-500">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <UserList
          users={users}
          handleRemoveUser={handleRemoveUser}
          theme={theme}
        />
      </div>

      {showConfirm && (
        <ConfirmationDialog
          onConfirm={confirmRemoveUser}
          onCancel={cancelRemoveUser}
          theme={theme}
        />
      )}
    </div>
  );
};

export default AdUser;
