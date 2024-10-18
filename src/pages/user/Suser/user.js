import React, { useState } from "react";
import { MdSearch, MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useUserSearch from "../../../hooks/useUserSearch";
import { useUser } from "../../../context/UserProvider";

const User = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("username");
  const { results, loading, error } = useUserSearch(searchTerm, searchField);
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  const handleFieldChange = (e) => {
    setSearchField(e.target.value);
  };

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
            />
            <button
              type="button"
              className="bg-primary text-primary-foreground rounded-r-lg px-4 py-2 hover:bg-primary/90"
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
          <select
            className="mt-2 w-full bg-white border rounded-lg py-2 px-4"
            value={searchField}
            onChange={handleFieldChange}
          >
            <option value="username">Username</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email</option>
            <option value="id">ID</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error.message || "An error occurred"}</p>
            {error.details && <p>Details: {error.details}</p>}
          </div>
        )}
        {Array.isArray(results) && results.length > 0
          ? results.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => handleProfileClick(user.id)}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <img
                    src={user.profile_image}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {user.first_name} {user.last_name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                </div>
              </div>
            ))
          : !loading &&
            !error && (
              <p className="text-center text-gray-500">No results found</p>
            )}
      </div>
    </div>
  );
};

export default User;
