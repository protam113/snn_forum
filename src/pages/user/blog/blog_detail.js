import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// icons
import { FaTrashAlt, FaEdit, FaFlag } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { BsThreeDots, BsBookmark } from "react-icons/bs";
// data api
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import useUserInfo from "../../../hooks/useUserInfo";
import formatDate from "../../../utils/formatDate";
import Comment from "../../../components/comment/comment";
import { useTheme } from "../../../context/themeContext";
import useBlog from "../../../hooks/useBlog";

import CommentsSection from "../../../components/comment/CommentsSection";
import { Error404 } from "../../error/error";
import RecentFeed from "./feed/RecenFeed";

const Blog_detail = () => {
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { blog, loading, error, message, handleDeleteBlog, likedBlogs } =
    useBlog(blogId);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleProfileClick = (userId) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  const handleLike = (blogId, liked) => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  const renderMedia = (media) => {
    const extension = media.file.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <img
          key={media.file}
          src={media.file}
          alt="blog-media"
          className={`object-cover w-[500px] h-full cursor-pointer ${
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />{" "}
      </div>
    );
  if (message)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Error404 />
      </div>
    );

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
            onClick={() => handleProfileClick(blog.user.id)}
          />
          <div>
            <h1
              className={`font-bold text-base ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              onClick={() => handleProfileClick(blog.user.id)}
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
              <div className="absolute right-0 mt-2 w-48 bg-zinc-300 border border-zinc-400 shadow-lg rounded-lg z-10">
                <ul>
                  {userInfo?.username === blog.user.username && (
                    <>
                      <li
                        className="px-4 py-2 text-14 hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center"
                        onClick={() => handleEditClick(blog.id)}
                      >
                        <FaEdit className="mr-2 text-gray-400" />
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 text-14  hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center"
                        onClick={() => handleDeleteBlog(blog.id, userInfo)}
                      >
                        <FaTrashAlt className="mr-2 text-gray-400" />
                        Delete
                      </li>
                    </>
                  )}
                  <li className="px-4 py-2 text-14 hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center">
                    <FaFlag className="mr-2 text-gray-400" />
                    Report
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
            className={`mb-4 text-14 ${
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
          >
            {blog.likes_count} likes • {blog.comments_count} comments
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Likeblog
                blogId={blog.id}
                liked={likedBlogs[blog.id] || false}
                onLike={handleLike}
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
        </div>
        <hr className="my-2 border-zinc-900" />
        <CommentsSection />
        <Comment blogId={blogId} />
      </div>
      <hr className="my-4 border-zinc-900" />
      <h1 className="font-bold text-custom-red text-20">Recent Feed</h1>
      <RecentFeed />{" "}
    </div>
  );
};

export default Blog_detail;
