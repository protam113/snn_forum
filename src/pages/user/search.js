import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [isSearchAvailable, setIsSearchAvailable] = useState(true);
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!isSearchAvailable) {
      toast.error("Chức năng tìm kiếm hiện chưa khả dụng", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
      return;
    }
    // Handle search logic here
  };

  return (
    <div className="relative w-80 mx-auto">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm..."
          className="w-full px-4 py-2 text-sm border-none outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!isSearchAvailable}
        />
        <button
          onClick={handleSearch}
          className={`p-2 rounded-full ${
            isSearchAvailable
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isSearchAvailable}
        >
          <FaSearch />
        </button>
      </div>
      {/* Inline Error Message */}
      {!isSearchAvailable && (
        <p className="mt-2 text-red-500 text-xs text-center">
          Chức năng tìm kiếm hiện chưa khả dụng
        </p>
      )}
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Search;
