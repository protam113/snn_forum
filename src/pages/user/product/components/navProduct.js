import React from "react";
import { FaSearch } from "react-icons/fa";

const NavProduct = () => {
  return (
    <div className="p-4 bg-gray-200 shadow-md rounded-lg">
      <div className="container mx-auto flex items-center">
        {/* Logo or Title */}
        <div className="text-20 font-semibold mr-6">
          <h1>Tìm Kiếm Sản Phẩm</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProduct;
