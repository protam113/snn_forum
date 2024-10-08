import React from "react";

import { FaHome, FaUser } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";
import { FaBasketShopping } from "react-icons/fa6";
import { useUser } from "../../../../context/UserProvider";

const Sidebar = () => {
  const { theme } = useTheme();
  const { userInfo } = useUser();

  const linkClasses = `relative flex items-center justify-center w-[190px] h-[40px] rounded hover:bg-gray-200 ${
    theme === "dark"
      ? "bg-zinc-800 text-white hover:bg-zinc-700"
      : "bg-white text-black"
  }`;

  return (
    <div>
      {/* Sidebar for desktop (lg) */}
      <div className="hidden lg:block lg:w-60 lg:bg-white-900 lg:text-black lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="relative flex flex-col space-y-4">
          <Link to="/" className={linkClasses}>
            <FaHome
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Trang Chủ</span>
          </Link>
          <Link to="/san_pham" className={linkClasses}>
            <FaBasketShopping
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Sản phẩm</span>
          </Link>
          <Link to="/nguoi_dung" className={linkClasses}>
            <FaUser
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Người dùng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
