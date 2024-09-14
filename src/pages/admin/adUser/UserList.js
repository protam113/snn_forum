import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const UserList = ({ users, handleRemoveUser, theme }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-sm">
    {users.map((user) => (
      <li
        key={user.id}
        className={`bg-white border border-gray-300 rounded-lg shadow-lg p-4 flex flex-col items-center text-center ${
          theme === "dark" ? "border-gray-700" : ""
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
        <p className="text-lg font-semibold">{user.username}</p>

        <button
          onClick={() => handleRemoveUser(user)}
          className={`mt-4 px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
            theme === "dark"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          <FaTrash />
          Xóa
        </button>
      </li>
    ))}
  </ul>
);

export default UserList;
