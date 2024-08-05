import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { ImSearch } from "react-icons/im";
import { BiSolidMessage, BiMenuAltRight } from "react-icons/bi";
import {
  IoIosHeart,
  IoIosArrowDown,
  IoMdSettings,
  IoIosNotifications,
} from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import Logo from "../../../../assets/img/Logo.svg";
import { useTheme } from "../../../../context/themeContext";
import useClickOutside from "../../../../hooks/useClickOutside";
import ThemeToggle from "../../../theme/ThemeToggle ";
import LogoutButton from "../../../../pages/auth/logout";
import useUserInfo from "../../../../hooks/useUserInfo";

const Navbar = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { theme } = useTheme();
  const { userInfo, loading, error } = useUserInfo();

  const toggleNavbar = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const ref = useClickOutside(() => {
    setIsMobileNavVisible(false);
  });

  return (
    <div
      className={`w-full min-h-14 sticky top-0 z-50 ${
        theme === "light" ? "bg-white" : "bg-zinc-900"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between px-8 py-4 text-sm">
        {/* Logo section */}
        <section className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" id="logo" className="mr-2" />
            <div className="text-lg">
              <span className="text-custom-red font-bold">Tech</span>{" "}
              <span
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Forum
              </span>
            </div>
          </Link>
        </section>

        {/* Links section */}
        <section className="flex-1 hidden md:flex justify-center items-center space-x-8">
          <Link
            to="/"
            className={`relative group px-8 py-2 transition-all ${
              theme === "light"
                ? "text-black hover:text-gray-400"
                : "text-white hover:text-gray-300"
            } flex items-center`}
          >
            <span className="text-base font-bold">Blog</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-white" : "bg-gray-300"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>

          <Link
            to="/tuyen_dung"
            className={`relative group px-8 py-2 transition-all ${
              theme === "light"
                ? "text-black hover:text-gray-400"
                : "text-white hover:text-gray-300"
            } flex items-center`}
          >
            <span className="text-base font-bold">Tuyển dụng</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-white" : "bg-gray-300"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>
          <Link
            to="/messages"
            className={`relative group px-8 py-2 transition-all ${
              theme === "light"
                ? "text-black hover:text-gray-400"
                : "text-white hover:text-gray-300"
            } flex items-center`}
          >
            <span className="text-base font-bold">Tìm Kiếm</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-white" : "bg-gray-600"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>
        </section>

        {/* Menu section */}
        <section className="hidden md:flex items-center space-x-4">
          <Link
            to="/manage"
            className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-red-600 rounded-md bg-custom-red"
          >
            <FaRegAddressCard className="text-xl" />
            <span>Manage</span>
          </Link>

          <span className="text-2xl text-black">
            <FaRegBell />
          </span>
          <span
            className={`absolute bottom-0 left-0 w-0 h-0.5 ${
              theme === "light" ? "bg-white" : "bg-gray-300"
            } transition-all duration-300 group-hover:w-full`}
          ></span>

          <div className="relative group">
            <button
              className="flex cursor-pointer items-center px-4 py-2 transition-all text-back"
              onClick={toggleNavbar}
            >
              {!userInfo ? (
                <BiMenuAltRight
                  className={`font-semibold text-2xl ${
                    theme === "light" ? "text-zinc-900" : "text-white"
                  }`}
                />
              ) : (
                <img
                  src={userInfo.profile_image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              )}
              <IoIosArrowDown
                className={`ml-2 transition-transform ${
                  isMobileNavVisible ? "rotate-180" : "rotate-0"
                } ${theme === "light" ? "text-zinc-900" : "text-white"}`}
              />
            </button>
            <div
              ref={ref}
              className={`absolute right-0 top-12 flex flex-col gap-3 rounded-lg bg-zinc-500 py-6 px-6 shadow-md transition-all ${
                isMobileNavVisible ? "flex" : "hidden"
              }`}
              style={{ minWidth: "200px" }}
            >
              {userInfo ? (
                <Link
                  to={`/profile/${userInfo.username}`}
                  className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-zinc-600 rounded-md"
                >
                  <img
                    src={userInfo.profile_image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white">Profile</span>
                </Link>
              ) : null}
              <Link
                to="/setting"
                className="flex items-center space-x-3 px-4 py-2 text-neutral-200 hover:text-black hover:bg-zinc-600 rounded-md"
              >
                <IoMdSettings className="text-xl" />
                <span>Setting</span>
              </Link>
              <div className="flex items-center space-x-3 px-4 py-2 text-neutral-200">
                <ThemeToggle />
              </div>
              {userInfo ? (
                <div className="flex items-center space-x-3 px-4 py-2 text-neutral-200 hover:text-black hover:bg-zinc-600 rounded-md">
                  <LogoutButton />
                </div>
              ) : null}
            </div>
          </div>
          {loading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>Error: {error}</span>
          ) : !userInfo ? (
            <Link
              to="/login"
              className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all"
            >
              Login
            </Link>
          ) : null}
        </section>

        {/* Hamburger menu for mobile */}
        <div>
          {userInfo && userInfo.profile_image ? (
            <img
              src={userInfo.profile_image}
              alt="Profile"
              className="cursor-pointer text-5xl md:hidden w-12 h-12 rounded-full"
              style={{ color: theme === "light" ? "black" : "white" }}
              onClick={toggleNavbar}
            />
          ) : (
            <BiMenuAltRight
              className="cursor-pointer text-5xl md:hidden"
              style={{ color: theme === "light" ? "black" : "white" }}
              onClick={toggleNavbar}
            />
          )}
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobileNavVisible && (
        <div
          className={`md:hidden flex flex-col items-end bg-zinc-800 ${
            theme === "light" ? "text-white" : "text-white"
          } py-5 px-5`}
        >
          <Link to="/" className="block py-4 text-lg" onClick={toggleNavbar}>
            <HiHome className="text-3xl" />
          </Link>
          <Link
            to="/search"
            className="block py-4 text-lg"
            onClick={toggleNavbar}
          >
            <ImSearch className="text-3xl" />
          </Link>
          <Link
            to="/messages"
            className="block py-4 text-lg"
            onClick={toggleNavbar}
          >
            <BiSolidMessage className="text-3xl" />
          </Link>
          <Link
            to="/single-series"
            className="block py-4 text-lg"
            onClick={toggleNavbar}
          >
            <IoIosHeart className="text-3xl" />
          </Link>
          <ThemeToggle />

          <Link
            to="/product"
            className="block py-4 text-lg"
            onClick={toggleNavbar}
          >
            <IoIosNotifications className="text-3xl" />
          </Link>

          {userInfo ? (
            <div className="block py-4 text-lg">
              <LogoutButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all block py-4 text-lg"
              onClick={toggleNavbar}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
