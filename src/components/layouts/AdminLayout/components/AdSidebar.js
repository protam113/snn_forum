import React from "react";
import { FaHome, FaList, FaUsers, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";
import { FaChartArea } from "react-icons/fa";

const AdSidebar = () => {
  const { theme } = useTheme();

  const linkClasses = `relative flex items-center justify-center w-[190px] h-[40px] rounded-md hover:bg-gray-400 ${
    theme === "dark"
      ? " text-white hover:bg-zinc-700"
      : " text-black hover:bg-gray-100"
  }`;

  return (
    <div>
      {/* Sidebar for desktop (lg) */}
      <div className=" lg:block lg:w-60 lg:bg-white-900 lg:text-black lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="relative flex flex-col space-y-4">
          <Link to="/admin" className={linkClasses}>
            <FaHome
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-base font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/the_loai" className={linkClasses}>
            <FaList
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-base font-medium">Category</span>
          </Link>
          <Link to="/admin/quan_ly_nguoi_dung" className={linkClasses}>
            <FaUsers
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-base font-medium">Users</span>
          </Link>
          <Link to="/admin/banners" className={linkClasses}>
            <FaFlag
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-base font-medium">Banners</span>
          </Link>
          <Link to="/admin/thong_ke" className={linkClasses}>
            <FaChartArea
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-base font-medium">Thống Kê</span>
          </Link>
        </div>
        <hr className="border-zinc-900 my-4" />
      </div>
    </div>
  );
};

export default AdSidebar;
