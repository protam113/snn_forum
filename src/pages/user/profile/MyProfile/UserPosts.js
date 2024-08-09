import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCommentAlt, FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { BiRepost } from "react-icons/bi";
import useUserInfo from "../../../../hooks/useUserInfo";
import formatDate from "../../../../utils/formatDate";
import Loading from "../../../error/load";
import LikePost from "../../../../components/buttons/likeBlog";
import useClickOutside from "../../../../hooks/useClickOutside";
import { useTheme } from "../../../../context/themeContext";
import useBlog from "../../../../hooks/useBlog";
import Block from "../../../../components/design/Block";

const Userblogs = () => {
  const { userBlogs, loading, error } = useUserInfo();
  const { likedBlogs, setLikedPosts, handleDeleteBlog, handleLike } = useBlog();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = React.useState(null);
  const [expandedBlogs, setExpandedBlogs] = React.useState({});

  const handleMenuClick = (blogId) => {
    setActiveMenu((prev) => (prev === blogId ? null : blogId));
  };

  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleToggleExpand = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await handleDeleteBlog(blogId);
    }
  };

  const menuRef = useClickOutside(() => {
    if (activeMenu !== null) {
      setActiveMenu(null);
    }
  });

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
          onClick={() => handleBlogClick(userBlogs.id)}
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
            onClick={() => handleBlogClick(userBlogs.id)}
          />
        </div>
      );
    }
    return null;
  };

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p>Đã xảy ra lỗi khi lấy blog</p>;

  const posts = userBlogs.results || [];

  return (
    <>
      {posts.length === 0 ? (
        <p>Không có bài viết nào để hiển thị.</p>
      ) : (
        posts.map((blog) => (
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
              />
              <div className="ml-2">
                <h1
                  className={`text-base font-bold leading-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <span>{blog.user.username}</span>
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
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleMenuClick(blog.id)}
                />
                {activeMenu === blog.id && (
                  <div
                    ref={menuRef} // Apply ref here
                    className={`absolute right-0 mt-2 w-48 ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600"
                        : "bg-zinc-200 border-gray-300"
                    } border shadow-lg rounded-lg z-10`}
                  >
                    <ul
                      className={`text-black-300 ${
                        theme === "dark" ? "text-gray-200" : "text-black"
                      }`}
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                        onClick={() => handleEditClick(blog.id)}
                      >
                        <FaEdit
                          className={`mr-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        Chỉnh sửa
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                        onClick={() => handleDeleteClick(blog.id)}
                      >
                        <FaTrashAlt
                          className={`mr-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        Xóa
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center">
                        <FaFlag
                          className={`mr-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
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
            <p
              onClick={() => handleBlogClick(blog.id)}
              className={`mb-8 text-14 ${
                theme === "dark" ? "text-gray-300" : "text-black"
              } ${expandedBlogs[blog.id] ? "" : "line-clamp-3"}`}
              dangerouslySetInnerHTML={{
                __html: expandedBlogs[blog.id]
                  ? blog.description
                  : `${blog.description.slice(0, 300)}${
                      blog.description.length > 300 ? "..." : ""
                    }`,
              }}
            />
            {!expandedBlogs[blog.id] && blog.description.length > 300 && (
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => handleToggleExpand(blog.id)}
              >
                Xem thêm
              </p>
            )}
            {expandedBlogs[blog.id] && (
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => handleToggleExpand(blog.id)}
              >
                Xem ít hơn
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
              >
                {blog.likes_count} lượt thích • {blog.comments_count} bình luận
              </p>
            </div>
            <hr
              className={`my-2 ${
                theme === "dark" ? "border-gray-600" : "border-zinc-900"
              }`}
            />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <LikePost
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
              {/* <BsBookmark
                className={`text-2xl cursor-pointer ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              /> */}
            </div>
          </Block>
        ))
      )}
    </>
  );
};

export default Userblogs;
