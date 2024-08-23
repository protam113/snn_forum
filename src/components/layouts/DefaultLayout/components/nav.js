import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoMdSettings } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import Logo from "../../../../assets/img/Logo.svg";
import { useTheme } from "../../../../context/themeContext";
import useClickOutside from "../../../../hooks/useClickOutside";
import LogoutButton from "../../../../pages/auth/logout";
import useUserInfo from "../../../../hooks/useUserInfo";
import ThemeToggle from "../../../theme/ThemeToggle ";
import { BiMenuAltRight } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { MdPerson } from "react-icons/md";

import Notifications from "../../../notification/noti";

const Navbar = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { theme } = useTheme();
  const { userInfo, userRoles } = useUserInfo();

  const toggleNavbar = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const closeNavbar = () => {
    setIsMobileNavVisible(false);
  };

  const ref = useClickOutside(() => {
    closeNavbar();
  });

  const isAdmin = userRoles.includes("admin") || userRoles.includes("manager");

  return (
    <div
      className={`w-full min-h-14 sticky top-0 z-50 ${
        theme === "light" ? "bg-white" : "bg-zinc-900"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between px-8 py-2 text-sm">
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

        {/* Navigation links for desktop */}
        <section className="flex-1 hidden md:flex justify-center items-center space-x-8">
          <Link
            to="/"
            className={`relative group px-8 py-2 transition-all ${
              theme === "light"
                ? "text-black hover:text-gray-400"
                : "text-white hover:text-gray-300"
            } flex items-center`}
          >
            <span className="text-16 font-bold">Blog</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-black" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>

          <Link
            to="/san_pham"
            className={`relative group px-8 py-2 transition-all ${
              theme === "light"
                ? "text-black hover:text-gray-400"
                : "text-white hover:text-gray-300"
            } flex items-center`}
          >
            <span className="text-16 font-bold">Sản Phẩm</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-black" : "bg-white"
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
            <span className="text-16 font-bold">Tuyển dụng</span>
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                theme === "light" ? "bg-black" : "bg-white"
              } transition-all duration-300 group-hover:w-full`}
            ></span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className={`relative group px-8 py-2 transition-all ${
                theme === "light"
                  ? "text-black hover:text-gray-400"
                  : "text-white hover:text-gray-300"
              } flex items-center`}
            >
              <span className="text-16 font-bold">Admin</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 ${
                  theme === "light" ? "bg-black" : "bg-white"
                } transition-all duration-300 group-hover:w-full`}
              ></span>
            </Link>
          )}
        </section>

        {/* User info and menu */}
        <section className="flex items-center space-x-4">
          {/* <Notifications /> */}
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
                <div className="flex items-center">
                  {userInfo.profile_image ? (
                    <img
                      src={userInfo.profile_image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                  ) : (
                    <MdPerson
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        theme === "light" ? "text-zinc-900" : "text-white"
                      }`}
                    />
                  )}
                </div>
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
              onClick={() => {
                if (isMobileNavVisible) closeNavbar();
              }}
            >
              {userInfo ? (
                <Link
                  to={`/profile/${userInfo.id}`}
                  className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-zinc-600 rounded-md"
                >
                  {userInfo.profile_image ? (
                    <img
                      src={userInfo.profile_image}
                      alt="Profile"
                      className="w-8 h-8  rounded-full cursor-pointer"
                    />
                  ) : (
                    <MdPerson
                      className={`w-8 h-8 rounded-full bg-white cursor-pointer ${
                        theme === "light" ? "text-zinc-900" : "text-white"
                      }`}
                    />
                  )}
                  <span className="text-white">Profile</span>
                </Link>
              ) : null}
              <Link
                to="/"
                className={`relative group px-4 py-2 transition-all md:hidden ${
                  theme === "light"
                    ? "text-white hover:text-gray-400"
                    : "text-white hover:text-gray-400"
                }`}
              >
                <span className="text-14">Blog</span>
              </Link>
              <Link
                to="/san_pham"
                className={`relative group px-4 py-2 transition-all md:hidden ${
                  theme === "light"
                    ? "text-white hover:text-gray-400"
                    : "text-white hover:text-gray-400"
                }`}
              >
                <span className="text-14">Sản Phẩm</span>
              </Link>

              <Link
                to="/tuyen_dung"
                className={`relative group px-4 py-2 transition-all md:hidden ${
                  theme === "light"
                    ? "text-white hover:text-gray-400"
                    : "text-white hover:text-gray-400"
                }`}
              >
                <span className="text-14">Tuyển dụng</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`relative group px-4 py-2 transition-all md:hidden ${
                    theme === "light"
                      ? "text-white hover:text-gray-400"
                      : "text-white hover:text-gray-400"
                  }`}
                >
                  <span className="text-14">Admin</span>
                </Link>
              )}

              <Link
                to="/setting"
                className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-zinc-600 rounded-md"
              >
                <IoMdSettings className="text-14" />
                <span>Settings</span>
              </Link>
              <Link
                to="/support"
                className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-zinc-600 rounded-md"
              >
                <MdSupportAgent className="text-14" />
                <span>Đóng góp</span>
              </Link>
              <LogoutButton />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
