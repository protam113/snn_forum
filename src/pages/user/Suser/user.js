import React, { useState, useEffect } from "react";
import { MdSearch, MdClear } from "react-icons/md";
import { MdPerson } from "react-icons/md"; // Thêm import icon MdPerson
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
      fetchUsers();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    fetchUsers();
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
      fetchUsers();
    }
  }, [searchTerm, fetchUsers]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-md">
          <div className="relative flex text-black items-center border rounded-lg bg-white border-zinc-800">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full py-2 px-4 bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
            <button
              type="button"
              className="bg-primary text-primary-foreground rounded-r-lg px-4 py-2 hover:bg-primary/90"
              onClick={fetchUsers}
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
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => handleProfileClick(user.id)}
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <MdPerson className="w-12 h-12 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {user.first_name} {user.last_name || "Unknown"}
              </h3>
              <p className="text-sm text-gray-600">@{user.username}</p>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default User;
