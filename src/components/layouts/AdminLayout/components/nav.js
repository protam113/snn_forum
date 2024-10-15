import React from "react";
import {
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaUserShield,
} from "react-icons/fa";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { useUser } from "../../../../context/UserProvider";
import { Link } from "react-router-dom";
import LogoutButton from "../../../../pages/auth/logout";

export const AdNav = () => {
  const { userInfo } = useUser();
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-main-blue2 ">
      <div className="flex items-center">
        {/* Logo or Title can go here if needed */}
        <h1 className="text-lg font-semibold text-white">H2H Dashboard</h1>
      </div>
      <div className="relative">
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center focus:outline-none">
            <img
              src={userInfo.profile_image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="ml-2 hidden lg:block text-white font-medium">
              {userInfo.username || "H2H Tech Energy"}
            </span>
          </MenuButton>
          <MenuItems
            as="div"
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
          >
            <MenuItem
              as="div"
              className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <Link to={`/profile/${userInfo.id}`}>
                <FaUserCircle className="mr-2 text-gray-500" />
                My Profile
              </Link>
            </MenuItem>
            <MenuItem
              as="div"
              className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <Link to="/">
                <FaCog className="mr-2 text-gray-500" />
                Home Page
              </Link>
            </MenuItem>
            {/* <MenuItem
              as="div"
              className="flex items-center p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <FaUserShield className="mr-2 text-gray-500" />
              Support
            </MenuItem> */}
            <MenuItem
              as="div"
              className="flex items-center p-2 text-red-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogoutButton />
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};
