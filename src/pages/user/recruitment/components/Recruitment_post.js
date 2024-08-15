import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../../components/design/Block";
import { FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "../../../../context/themeContext";
import useRecruitment from "../../../../hooks/useRecruitment";
import useUserInfo from "../../../../hooks/useUserInfo";
import Loading from "../../../error/load";

const RecruitmentPost = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();

  const { recruitments, loading, error } = useRecruitment();

  const handlePostClick = (postId) => {
    navigate(`/tuyen_dung/${postId}`);
  };

  const handleProfileClick = (userId) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  const handleEditClick = (postId) => {
    navigate(`/recruitment/edit/${postId}/`);
  };

  const handleMenuClick = (postId) => {
    setActiveMenu((prev) => (prev === postId ? null : postId));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <p>Đã xảy ra lỗi khi lấy blog</p>;

  return (
    <div className="post-list">
      {recruitments.map((recruitment) => {
        const isOwner = userInfo && userInfo.id === recruitment.owner;

        return (
          <Block
            key={recruitment.id}
            className={`col-span-12 row-span-4 md:col-span-6 mb-4 p-4 ${
              theme === "dark"
                ? "bg-zinc-800 text-white"
                : "bg-white text-black"
            } border-2 ${
              theme === "dark"
                ? "border-transparent hover:border-zinc-700 hover:bg-zinc-700"
                : "border-transparent hover:border-zinc-300 hover:bg-zinc-300"
            } transition-colors duration-200`}
          >
            <div className="flex items-center mb-4">
              <img
                src="https://static.chotot.com/storage/chotot-icons/png/jobtype_v2/2.png"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-2 flex-1">
                <h1
                  className={`text-14 font-bold ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {recruitment.user.first_name} {recruitment.user.last_name}
                </h1>
                <p
                  className={`text-gray-500 text-14 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {new Date(recruitment.created_date).toLocaleDateString()}
                </p>
              </div>
              <div className="relative">
                <BsThreeDots
                  className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
                  onClick={() => handleMenuClick(recruitment.id)}
                />
                {activeMenu === recruitment.id && (
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
                        onClick={() => handleEditClick(recruitment.id)}
                      >
                        <FaEdit className="mr-2 text-gray-400" />
                        Chỉnh sửa
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                        // onClick={() => handleDeletePost(recruitment.id, userInfo)}
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
              onClick={() => handlePostClick(recruitment.id)}
            >
              {recruitment.content}
            </p>
            <div className="flex justify-between mb-4">
              <p
                className={`text-14 cursor-pointer ${
                  theme === "dark" ? "text-gray-200" : "text-black"
                }`}
              >
                Mức lương: {recruitment.salary}
              </p>
              <p
                className={`text-14 cursor-pointer ${
                  theme === "dark" ? "text-gray-200" : "text-black"
                }`}
              >
                Khu vực: {recruitment.location}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p
                className={`text-14 cursor-pointer ${
                  theme === "dark" ? "text-gray-200" : "text-black"
                }`}
              >
                Số Lượng: {recruitment.quantity}
              </p>
              <p className="text-white bg-red-400 px-2 py-1 rounded">
                {new Date(recruitment.date).toLocaleDateString()}
              </p>
            </div>
          </Block>
        );
      })}
    </div>
  );
};

export default RecruitmentPost;
