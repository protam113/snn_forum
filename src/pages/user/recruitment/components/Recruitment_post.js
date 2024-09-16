import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../../components/design/Block";
import { FaEdit, FaTrashAlt, FaLink } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "../../../../context/themeContext";
import Loading from "../../../error/load";
import formatDate from "../../../../utils/formatDate";
import {
  useDeleteRecruitment,
  useRecruitmentList,
} from "../../../../hooks/Recruitment/useRecruitment";
import SkeletonBlog from "../../../../components/design/SkeletonBlog";
import { debounce } from "lodash";
import { useUser } from "../../../../context/UserProvider";

const RecruitmentPost = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { userInfo } = useUser();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useRecruitmentList();
  const { mutate: deleteRecruitmentMutation } = useDeleteRecruitment();

  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight > documentHeight * 0.7 &&
        !isFetchingNextPage
      ) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    }, 300),
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handlePostClick = (postId) => {
    navigate(`/tuyen_dung/${postId}`);
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  const handleEditClick = (postId) => {
    navigate(`/tuyen_dung/chinh_sua/${postId}/`);
  };

  const handleMenuClick = (postId) => {
    setActiveMenu((prev) => (prev === postId ? null : postId));
  };

  const handleDeleteClick = async (postId) => {
    return deleteRecruitmentMutation(
      { postId },
      {
        onSuccess: () => {},
      }
    );
  };

  const handleCopyUrl = (postId) => {
    const url = `${window.location.origin}/tuyen_dung/${postId}`;
    navigator.clipboard.writeText(url).then(
      () => {
        alert("URL đã được sao chép vào clipboard!");
      },
      (err) => {
        console.error("Lỗi khi sao chép URL:", err);
      }
    );
  };

  if (isFetching && !data)
    return (
      <div className="min-h-screen">
        {[...Array(3)].map((_, index) => (
          <SkeletonBlog key={index} />
        ))}
      </div>
    );

  return (
    <div className="post-list">
      {data?.pages
        .flatMap((page) => page.recruitments)
        ?.map((recruitment) => {
          const isOwner = userInfo && userInfo.id === recruitment.user.id;

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
                    onClick={() => handleProfileClick(recruitment.user.id)}
                  >
                    {recruitment.user.first_name} {recruitment.user.last_name}
                  </h1>
                  <p
                    className={`text-gray-500 text-14 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {formatDate(recruitment.created_date)}
                  </p>
                </div>
                <div className="relative ml-auto">
                  <BsThreeDots
                    className={`text-2xl cursor-pointer ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-gray-200"
                        : "text-black hover:text-gray-700"
                    }`}
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
                        {isOwner && (
                          <>
                            <li
                              className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                              onClick={() => handleEditClick(recruitment.id)}
                            >
                              <FaEdit className="mr-2 text-gray-400" />
                              Chỉnh sửa
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                              onClick={() => handleDeleteClick(recruitment.id)}
                            >
                              <FaTrashAlt className="mr-2 text-gray-400" />
                              Xóa
                            </li>
                          </>
                        )}

                        <li
                          className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                          onClick={() => handleCopyUrl(recruitment.id)}
                        >
                          <FaLink className="mr-2 text-gray-400" />
                          Sao chép URL
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div onClick={() => handlePostClick(recruitment.id)}>
                <p
                  className={`mb-4 font-semibold text-16 cursor-pointer ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
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
                  <button
                    className={`bg-custom-red text-white text-14 px-4 py-2 rounded ${
                      theme === "dark" ? "hover:bg-red-600" : "hover:bg-red-700"
                    }`}
                    onClick={() => handlePostClick(recruitment.id)}
                  >
                    Ứng tuyển ngay
                  </button>{" "}
                </div>
              </div>
            </Block>
          );
        })}
    </div>
  );
};

export default RecruitmentPost;
