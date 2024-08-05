import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../../components/design/Block";
import { FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Logo from "../../../../assets/img/Logo.svg";
import { useTheme } from "../../../../context/themeContext";

const RecruitmentMng = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handlePostClick = (postId) => {
    navigate(`/recruitment/${postId}`);
  };

  const handleEditClick = (postId) => {
    navigate(`/recruitment/edit/${postId}/`);
  };

  const handleMenuClick = (postId) => {
    setActiveMenu((prev) => (prev === postId ? null : postId));
  };

  // Define the content and expiry date as variables
  const content =
    "Nhân Viên Bảo Trì - Thu Nhập Lên Đến 15 Triệu - Đi Làm Tại Quận 1";
  const expiryDate = "05/08/2024"; // Example expiry date

  return (
    <Block
      className={`col-span-12 row-span-4 md:col-span-6 mb-4 p-4 ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      } border-2 ${
        theme === "dark"
          ? "border-transparent hover:border-zinc-700 hover:bg-zinc-700"
          : "border-transparent hover:border-zinc-300 hover:bg-zinc-300"
      } transition-colors duration-200`}
    >
      <div className="flex items-center mb-4">
        <img src={Logo} alt="avatar" className="w-12 h-12 rounded-full" />
        <div className="ml-2 flex-1">
          <h1
            className={`text-14 font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Song Nhat Nguyen
          </h1>
          <p
            className={`text-gray-500 text-14 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            29/07/2024
          </p>
        </div>
        <div className="relative">
          <BsThreeDots
            className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
            onClick={() => handleMenuClick(1)} // Hardcoded postId for demo
          />
          {activeMenu === 1 && (
            <div
              className={`absolute right-0 mt-2 w-48 ${
                theme === "dark"
                  ? "bg-zinc-800 border-gray-700"
                  : "bg-white border-gray-300"
              } shadow-lg rounded-lg z-10`}
            >
              <ul className="text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                  onClick={() => handleEditClick(1)} // Hardcoded postId for demo
                >
                  <FaEdit className="mr-2 text-gray-400" />
                  Chỉnh sửa
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                  // onClick={() => handleDeletePost(post.id, userInfo)}
                >
                  <FaTrashAlt className="mr-2 text-gray-400" />
                  Xóa
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center">
                  <FaFlag className="mr-2 text-gray-400" />
                  Báo cáo
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p
        className={`mb-4 font-semibold text-16 cursor-pointer ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
        onClick={() => handlePostClick(1)}
      >
        {content}
      </p>
      <div className="flex justify-between mb-4">
        <p
          className={`text-14 cursor-pointer ${
            theme === "dark" ? "text-gray-200" : "text-black"
          }`}
        >
          Mức lương
        </p>
        <p
          className={`text-14 cursor-pointer ${
            theme === "dark" ? "text-gray-200" : "text-black"
          }`}
        >
          Khu vực
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p
          className={`text-14 cursor-pointer ${
            theme === "dark" ? "text-gray-200" : "text-black"
          }`}
        >
          Ngày hết hạn:
        </p>
        <p className="text-white bg-red-400 px-2 py-1 rounded">{expiryDate}</p>
      </div>
    </Block>
  );
};

export default RecruitmentMng;
