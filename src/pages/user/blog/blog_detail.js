import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaFlag } from "react-icons/fa";
import { BsThreeDots, BsBookmark } from "react-icons/bs";
import useBlog from "../../../hooks/useBlog";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import useUserInfo from "../../../hooks/useUserInfo";
import formatDate from "../../../utils/formatDate";
import Comment from "../../../components/comment/comment";
import { BiRepost } from "react-icons/bi";
import { useTheme } from "../../../context/themeContext";

const Blog_detail = () => {
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const {
    blog,
    comments,
    loading,
    error,
    handleDeleteBlog,
    handleDeleteComment,
    likedBlogs,
  } = useBlog(blogId);

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  const handleLike = (blogId, liked) => {
    // Implementation for liking a blog
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
            style={{ width: "400px", height: "500px" }}
            frameBorder="0"
            title="PDF Viewer"
          />
        </div>
      );
    }
    return null;
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!blog) {
    return <p className="text-gray-500">No blog found.</p>;
  }

  return (
    <div className="post-detail flex flex-col items-center mt-8">
      <div className="max-w-6xl w-full">
        {/* Post Information and 3-dots menu */}
        <div className="flex items-center mb-4">
          <img
            src={blog.user.profile_image}
            alt="profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h1
              className={` font-bold text-base ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {blog.user.first_name} {blog.user.last_name}
            </h1>
            <p className="text-gray-500 text-sm">
              {formatDate(blog.created_date)}
            </p>
          </div>
          <div className="ml-auto relative">
            <BsThreeDots
              className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
              onClick={() => handleMenuClick(blog.id)}
            />
            {activeMenu === blog.id && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-300 shadow-lg rounded-lg z-10">
                <ul className="text-gray-300">
                  {userInfo?.username === blog.user.username && (
                    <>
                      <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center">
                        <FaEdit className="mr-2 text-gray-400" />
                        Chỉnh sửa
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                        onClick={() => handleDeleteBlog(blog.id, userInfo)}
                      >
                        <FaTrashAlt className="mr-2 text-gray-400" />
                        Xóa
                      </li>
                    </>
                  )}
                  <li className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center">
                    <FaFlag className="mr-2 text-gray-400" />
                    Báo cáo
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Content */}
        <div>
          <p
            className={`text-16 font-semibold text-black ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {blog.content}
          </p>
          <hr className="my-2 border-zinc-300" />
          <p
            className={`mb-4 text-14  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            dangerouslySetInnerHTML={{ __html: blog.description || "" }}
          />
        </div>
        <hr className="mt-2 border-gray-300" />
        {/* Media */}
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
        {/* Like, Comment, Repost Buttons */}
        <div className="mt-4">
          <hr className="my-2 border-zinc-900" />
          <p
            className={`text-gray-500 text-sm cursor-pointer ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
            // onClick={() => handleLikesClick(blog.id)}
            // onMouseEnter={() => handleLikesClick(blog.id)}
            // onMouseLeave={() => setShowLikesPopup(null)}
          >
            {blog.likes_count} lượt thích • {blog.comments_count} bình luận
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Likeblog
                blogId={blog.id}
                liked={likedBlogs[blog.id] || false}
                onLike={handleLike}
              />
              <BiRepost
                className={`text-2xl cursor-pointer ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex items-center gap-4">
              <BsBookmark
                className={`text-2xl cursor-pointer ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              />
            </div>
          </div>
        </div>
        <hr className="my-2 border-zinc-900" />
        {/* Comments Section */}
        <div className="col-span-5">
          <h2
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Comments({comments.length})
          </h2>
          <hr
            className={`my-4 ${
              theme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />
          <div className="comments-section">
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.user.profile_image}
                        alt="profile"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div className="flex-grow text-14">
                        <p>
                          <strong
                            className={`text-${
                              theme === "dark" ? "white" : "black"
                            } text-14`}
                          >
                            {comment.user.first_name} {comment.user.last_name}
                          </strong>
                          <br />
                          <span
                            className={`text-${
                              theme === "dark" ? "zinc-400" : "zinc-600"
                            } text-14`}
                          >
                            {comment.user.username}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {" "}
                            • {formatDate(comment.created_date)}
                          </span>
                        </p>
                      </div>
                      {userInfo?.username === comment.user.username && (
                        <FaTrashAlt
                          className="ml-2 text-gray-500 cursor-pointer"
                          onClick={() => handleDeleteComment(comment.id)}
                        />
                      )}
                    </div>
                    <p
                      className={`ml-10 text-${
                        theme === "dark" ? "white" : "black"
                      }`}
                    >
                      {comment.content}
                    </p>
                    <button
                      className={`mt-2 text-blue-400 hover:underline ${
                        theme === "dark" ? "hover:text-blue-300" : ""
                      }`}
                    >
                      Trả lời
                    </button>
                    <hr
                      className={`mt-2 ${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    />
                  </div>
                ))
              ) : (
                <p
                  className={`text-${
                    theme === "dark" ? "gray-400" : "gray-500"
                  }`}
                >
                  No comments yet.
                </p>
              )}
            </div>
            <hr
              className={`my-2 ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              }`}
            />
            <Comment blogId={blogId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog_detail;
