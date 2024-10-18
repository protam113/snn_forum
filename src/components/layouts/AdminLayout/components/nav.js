import React from "react";
import { FaCog, FaUserCircle } from "react-icons/fa";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useUser } from "../../../../context/UserProvider";
import { Link } from "react-router-dom";
import LogoutButton from "../../../../pages/auth/logout";

export const AdNav = () => {
  const { userInfo } = useUser();

  return (
    <div className="relative">
      <Menu as="div" className="relative">
        <MenuButton className="flex items-center space-x-2 focus:outline-none">
          <img
            src={userInfo.profile_image}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-gray-300"
          />
          <span className="hidden lg:block text-white font-medium">
            {userInfo.username || "H2H Tech Energy"}
          </span>
        </MenuButton>
        <MenuItems
          as="div"
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <MenuItem as="div">
            <Link
              to={`/profile/${userInfo.id}`}
              className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-150"
            >
              <FaUserCircle className="mr-2 text-gray-500" />
              <span className="text-gray-700">Trang Cá Nhân</span>
            </Link>
          </MenuItem>
          <MenuItem as="div">
            <Link
              to="/"
              className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-150"
            >
              <FaCog className="mr-2 text-gray-500" />
              <span className="text-gray-700">Trang Chủ</span>
            </Link>
          </MenuItem>
          <MenuItem as="div">
            <div className="flex items-center p-2 text-red-500 hover:bg-gray-100 transition-colors duration-150">
              <LogoutButton />
            </div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
