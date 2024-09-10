import React, { useState } from "react";
import { FaHome, FaList, FaUsers, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";
import { FaChartArea, FaTags } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import useUserInfo from "../../../../hooks/useUserInfo";
import useClickOutside from "../../../../hooks/useClickOutside";
import { IoIosArrowDown } from "react-icons/io";

const AdSidebar = () => {
  const { theme } = useTheme();
  const { userRoles } = useUserInfo();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false); // New state for "Thống Kê" visibility

  const toggleNavbar = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  const closeNavbar = () => {
    setIsMobileNavVisible(false);
  };

  const toggleStats = () => {
    setIsStatsVisible(!isStatsVisible); // Toggle stats visibility
  };

  const ref = useClickOutside(() => {
    closeNavbar();
  });

  const linkClasses = `flex items-center space-x-4 p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
    theme === "dark"
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "bg-gray-100 text-black hover:bg-gray-200"
  }`;

  const isAdmin = userRoles.includes("admin");

  return (
    <div
      className={`lg:w-60 lg:bg-${
        theme === "dark" ? "gray-800" : "white"
      } lg:text-${
        theme === "dark" ? "white" : "black"
      } lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto`}
    >
      <div className="flex flex-col space-y-2">
        <Link to="/admin" className={linkClasses}>
          <FaHome className="text-lg" />
          <span className="text-base font-medium">Dashboard</span>
        </Link>
        <Link to="/admin/the_loai" className={linkClasses}>
          <FaList className="text-lg" />
          <span className="text-base font-medium">Category</span>
        </Link>
        <Link to="/admin/tag" className={linkClasses}>
          <FaTags className="text-lg" />
          <span className="text-base font-medium">Tag</span>
        </Link>
        <Link to="/admin/quan_ly_nguoi_dung" className={linkClasses}>
          <FaUsers className="text-lg" />
          <span className="text-base font-medium">Users</span>
        </Link>
        <Link to="/admin/banners" className={linkClasses}>
          <FaFlag className="text-lg" />
          <span className="text-base font-medium">Banners</span>
        </Link>
        <button className={linkClasses} onClick={toggleStats}>
          <FaChartArea className="text-lg" />
          <span className="text-base font-medium">Thống Kê</span>
          <IoIosArrowDown
            className={`ml-2 transition-transform ${
              isStatsVisible ? "rotate-180" : "rotate-0"
            } ${theme === "light" ? "text-zinc-900" : "text-white"}`}
          />
        </button>
        {isStatsVisible && (
          <div
            className={`pl-4 flex flex-col ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <Link
              to="/admin/thong_ke/blog"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">Bài Viết</span>
            </Link>
            <Link
              to="/admin/thong_ke/san_pham"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">
                Danh mục sản phẩm thống kê chung
              </span>
            </Link>
            <Link
              to="/admin/thong_ke/the_loai"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">
                Thống kê sản phẩm theo danh mục
              </span>
            </Link>
            <Link
              to="/admin/thong_ke/don_ung_tuyen"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">
                Thống kê các đơn ứng tuyển
              </span>
            </Link>
            <Link
              to="/admin/thong_ke/ung_tuyen"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">Thống kê ứng tuyển</span>
            </Link>
            <Link
              to="/admin/thong_ke/tuyen_dung"
              className={`p-3 rounded-md transition duration-300 ease-in-out hover:bg-gray-300 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className="text-base font-medium">Thống kê tuyển dụng</span>
            </Link>
            {/* Thêm các liên kết khác nếu cần */}
          </div>
        )}
        {isAdmin && (
          <Link to="/admin/thong_tin_web" className={linkClasses}>
            <GrUserAdmin className="text-lg" />
            <span className="text-base font-medium">Thông Tin Web</span>
          </Link>
        )}
      </div>
      <hr className="border-gray-400 my-4" />
    </div>
  );
};

export default AdSidebar;
