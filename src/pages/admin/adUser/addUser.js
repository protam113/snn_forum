import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import useAdmin from "../../../hooks/useAdmin";
import useUserSearch from "../../../hooks/useUserSearch";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const { groups, error, setSelectedGroup, addUserToGroup } = useAdmin();
  const { results: featuredUsers, loading, fetchUsers } = useUserSearch();
  const [selectedGroup, setSelectedGroupState] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleGroupChange = (event) => {
    const groupId = parseInt(event.target.value, 10);
    const group = groups.find((g) => g.id === groupId);
    setSelectedGroupState(group);
    setSelectedGroup(group);
  };

  const handleUserChange = (userId) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(userId)) {
        newSelected.delete(userId);
      } else {
        newSelected.add(userId);
      }
      return newSelected;
    });
  };

  const handleAddUsers = async () => {
    if (selectedGroup) {
      try {
        await Promise.all(
          Array.from(selectedUsers).map((userId) =>
            addUserToGroup(selectedGroup.id, userId)
          )
        );
        navigate("/admin/quan_ly_nguoi_dung");
      } catch (err) {
        console.error("Error adding users to group:", err);
      }
    }
  };

  // Helper function to get a list of group names for a user
  const getUserGroups = (user) => {
    return (user.groups ?? []).map((group) => group.name).join(", ");
  };

  // Filter groups to only include those with role 'manager'
  const managerGroups = groups.filter((group) => group.name === "manager");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaUserPlus className="text-blue-500" /> Thêm người dùng vào nhóm
      </h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Chọn nhóm:</label>
        <select
          onChange={handleGroupChange}
          defaultValue=""
          className="border border-gray-300 rounded-lg p-2 w-full bg-white"
        >
          <option value="">Chọn nhóm</option>
          {managerGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          Chọn người dùng:
        </label>
        {loading ? (
          <p className="text-blue-500">Loading users...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => handleUserChange(user.id)}
                  className="mb-2"
                />
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
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="py-1 px-2 rounded-lg bg-gray-200 text-gray-800">
                  {getUserGroups(user)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleAddUsers}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
        disabled={!selectedGroup || selectedUsers.size === 0}
      >
        <FaUserPlus />
        Thêm vào nhóm
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AddUser;
