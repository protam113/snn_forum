import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../components/design/Block";
import { FaRegCommentAlt, FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import { useTheme } from "../../../context/themeContext";
import useBlog from "../../../hooks/useBlog";
import formatDate from "../../../utils/formatDate";
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import useUserInfo from "../../../hooks/useUserInfo";
import { Error404 } from "../../error/error";

const Blog = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const navigate = useNavigate();
  const [showLikesPopup, setShowLikesPopup] = useState(null);
  const [likesData, setLikesData] = useState([]);
  const { theme } = useTheme();
  const {
    blogs,
    loading,
    error,
    likedBlogs,
    handleLike,
    handleDeleteBlog,
    getBlogLikes,
  } = useBlog();
  const { userInfo } = useUserInfo();
  const handleProfileClick = (userId) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  const handleMenuClick = (blogId) => {
    setActiveMenu((prev) => (prev === blogId ? null : blogId));
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await handleDeleteBlog(blogId);
    }
  };

  const handleToggleExpand = (blogId) => {
    setExpandedBlogId((prev) => (prev === blogId ? null : blogId));
  };

  const handleLikesClick = async (blogId) => {
    setShowLikesPopup((prev) => (prev === blogId ? null : blogId));
    if (showLikesPopup !== blogId) {
      try {
        const likes = await getBlogLikes(blogId);
        setLikesData(likes);
      } catch (error) {
        console.error("Error fetching likes", error);
      }
    }
  };

  const renderMedia = (media) => {
    const extension = media.file.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <img
          key={media.file}
          src={media.file}
          alt="blog-media"
          className={`object-cover w-100% h-full cursor-pointer ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        />
      );
    } else if (["pdf"].includes(extension)) {
      return (
        <div key={media.file} className="w-full">
          <iframe
            src={media.file}
            style={{ width: "100%", height: "500px" }}
            frameBorder="0"
            title="PDF Viewer"
          />
        </div>
      );
    }
    return null;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Error404 />
      </div>
    );

  return (
    <div className="post-list">
      {blogs.map((blog) => {
        const isOwner = userInfo && userInfo.id === blog.user.id;
        const isExpanded = expandedBlogId === blog.id;

        return (
          <Block
            key={blog.id}
            className={`col-span-12 row-span-4 md:col-span-6 mb-4 p-4 ${
              theme === "dark"
                ? "bg-zinc-700 text-white"
                : "bg-zinc-200 text-black"
            }`}
          >
            <div className="flex items-center mb-4">
              <img
                src={blog.user.profile_image}
                alt="avatar"
                className={`size-12 rounded-full ${
                  theme === "dark" ? "border-white" : "border-black"
                }`}
                onClick={() => handleProfileClick(blog.user.id)}
              />
              <div className="ml-2">
                <h1
                  className={`text-base font-bold leading-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  onClick={() => handleProfileClick(blog.user.id)}
                >
                  {blog.user.first_name} {blog.user.last_name}
                </h1>
                <p
                  className={`text-gray-500 text-14 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {formatDate(blog.created_date)}
                </p>
              </div>
              <div className="ml-auto relative">
                <BsThreeDots
                  className={`text-2xl cursor-pointer ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-gray-200"
                      : "text-black hover:text-gray-700"
                  }`}
                  onClick={() => handleMenuClick(blog.id)}
                />
                {activeMenu === blog.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-300 border border-gray-300 shadow-lg rounded-lg z-10">
                    <ul className="text-gray-300">
                      {isOwner && (
                        <>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 hover:text-gray-500 text-black cursor-pointer flex items-center"
                            onClick={() => handleEditClick(blog.id)}
                          >
                            <FaEdit className="mr-2 text-gray-400" />
                            Chỉnh sửa
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 hover:text-gray-500 text-black cursor-pointer flex items-center"
                            onClick={() => handleDeleteClick(blog.id)}
                          >
                            <FaTrashAlt className="mr-2 text-gray-400" />
                            Xóa
                          </li>
                        </>
                      )}
                      <li className="px-4 py-2 hover:bg-gray-200 hover:text-gray-500 text-black cursor-pointer flex items-center">
                        <FaFlag className="mr-2 text-gray-400" />
                        Báo cáo
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p
              onClick={() => handleBlogClick(blog.id)}
              className={`mb-8 text-15 cursor-pointer font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-black"
              }`}
            >
              {blog.content}
            </p>
            <div
              onClick={() => handleBlogClick(blog.id)}
              className={`mb-8 text-14 ${
                theme === "dark" ? "text-gray-300" : "text-black"
              } ${isExpanded ? "" : "line-clamp-3"}`}
              dangerouslySetInnerHTML={{
                __html: isExpanded
                  ? blog.description
                  : `${blog.description.slice(0, 300)}${
                      blog.description.length > 300 ? "..." : ""
                    }`,
              }}
            />
            {!isExpanded && blog.description.length > 300 && (
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => handleToggleExpand(blog.id)}
              >
                Thêm
              </p>
            )}
            {isExpanded && (
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => handleToggleExpand(blog.id)}
              >
                Ẩn Bớt
              </p>
            )}
            {blog.media.length > 0 && (
              <div
                className={`grid gap-4 ${
                  blog.media.length === 1
                    ? "grid-cols-1"
                    : blog.media.length === 2
                    ? "grid-cols-2"
                    : blog.media.length === 3
                    ? "grid-cols-3"
                    : "grid-cols-2"
                }`}
              >
                {blog.media.map((media) => renderMedia(media))}
              </div>
            )}
            <hr
              className={`my-4 ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              }`}
            />
            <div className="relative">
              <p
                className={`text-gray-500 text-sm cursor-pointer ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
                onClick={() => handleLikesClick(blog.id)}
                onMouseEnter={() => handleLikesClick(blog.id)}
                onMouseLeave={() => setShowLikesPopup(null)}
              >
                {blog.likes_count} lượt thích • {blog.comments_count} bình luận
              </p>
              {showLikesPopup === blog.id && (
                <div className="absolute top-0 right-0 mt-12 p-4 w-80 bg-white border border-gray-300 shadow-lg rounded-lg">
                  <h3 className="text-14 font-semibold">Likes</h3>
                  <ul>
                    {likesData.map((user) => (
                      <li
                        key={user.id}
                        className="flex items-center mt-2"
                        onClick={() => handleProfileClick(user.id)}
                      >
                        <img
                          src={user.profile_image}
                          alt="user-avatar"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-12 text-black">
                          {user.first_name} {user.last_name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <hr
              className={`my-2 ${
                theme === "dark" ? "border-gray-600" : "border-zinc-900"
              }`}
            />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Likeblog
                  blogId={blog.id}
                  liked={likedBlogs[blog.id] || false}
                  onLike={handleLike}
                />
                <FaRegCommentAlt
                  className={`text-2xl cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                  onClick={() => handleBlogClick(blog.id)}
                />
                {/* <BiRepost
                  className={`text-2xl cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                /> */}
              </div>
              <div className="flex items-center gap-4">
                {/* <BsBookmark
                  className={`text-2xl cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                /> */}
              </div>
            </div>
          </Block>
        );
      })}
    </div>
  );
};

export default Blog;
