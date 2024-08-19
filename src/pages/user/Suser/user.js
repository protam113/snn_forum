import React, { useState, useEffect } from "react";
import { MdSearch, MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useUserSearch from "../../../hooks/useUserSearch";
import useUserInfo from "../../../hooks/useUserInfo";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { results, loading, error, fetchUsers } = useUserSearch(searchTerm);
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchUsers(); // Trigger search on Enter key press
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchUsers(); // Fetch users again when clearing search term
  };

  const handleProfileClick = (userId) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      fetchUsers(); // Fetch users when searchTerm is empty
    }
  }, [searchTerm, fetchUsers]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Search users by name or email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchUsers}
          className="absolute inset-y-0 right-0 px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          <MdSearch className="text-xl" />
        </button>
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-12 px-3 py-2 text-gray-500 hover:text-gray-700"
          >
            <MdClear className="text-xl" />
          </button>
        )}
      </div>

      {loading && <p className="mt-2 text-gray-500">Loading...</p>}
      {error && <p className="mt-2 text-red-500">Error: {error.message}</p>}
      <ul>
        {results.length > 0 ? (
          results.map((user) => (
            <li
              key={user.id}
              onClick={() => handleProfileClick(user.id)}
              className="flex items-center cursor-pointer border-b py-2 hover:bg-gray-100"
            >
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-full mr-3"
                />
              ) : (
                <div className="w-10 h-10 rounded-full mr-3 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <span className="font-semibold">
                  {user.first_name} {user.last_name}
                </span>
                <div className="text-gray-600">{user.email}</div>
              </div>
            </li>
          ))
        ) : (
          <p className="mt-2 text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
};

export default User;
