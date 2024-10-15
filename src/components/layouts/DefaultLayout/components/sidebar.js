import React from "react";

import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";
import { FaBasketShopping } from "react-icons/fa6";

const Sidebar = () => {
  const { theme } = useTheme();

  const linkClasses = `relative flex items-center justify-center w-[190px] h-[40px] rounded hover:bg-milk-blue1 ${
    theme === "dark"
      ? "bg-zinc-800 text-white hover:bg-zinc-700"
      : "bg-white text-black"
  }`;

  return (
    <div>
      {/* Sidebar for desktop (lg) */}
      <div className="hidden lg:block lg:w-60 lg:bg-white-900 lg:text-black lg:p-4 lg:sticky lg:h-screen ">
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
