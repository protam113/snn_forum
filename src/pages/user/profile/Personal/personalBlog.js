import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Block from "../../../../components/design/Block";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md"; // Import MdPerson icon
import { useTheme } from "../../../../context/themeContext";
import formatDate from "../../../../utils/formatDate";
import Loading from "../../../error/load";
import LikePost from "../../../../components/buttons/likeBlog";
import useBlog from "../../../../hooks/useBlog";
import useUserInfo from "../../../../hooks/useUserInfo";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

const PersonalBlog = () => {
  const { id: personId } = useParams();
  const { personalBlogs, loading, error } = useUserInfo(personId);
  const { currentInfo } = useAuth();

  const { likedBlogs, handleLike } = useBlog();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [expandedBlogs, setExpandedBlogs] = React.useState({});

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleToggleExpand = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const handleCopyLink = (blogId) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`;
    navigator.clipboard
      .writeText(blogUrl)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy link");
        console.error("Failed to copy link", error);
      });
  };

  const renderMedia = (media) => {
    const extension = media.file.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <img
          key={media.file}
          src={media.file}
          alt="blog-media"
          className={`object-cover w-full sm:h-64 md:h-80 lg:h-96 xl:h-auto cursor-pointer ${
            theme === "dark" ? "border-gray-800" : "border-white"
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

  if (loading) return <Loading />;
  if (error) {
    console.error("Error fetching personal blogs:", error);
    return <p>Đã xảy ra lỗi khi lấy blog</p>;
  }

  const posts = personalBlogs || [];

  return (
    <>
      {posts.length === 0 ? (
        <p>Không có bài viết nào để hiển thị.</p>
      ) : (
        posts
          .filter((blog) => blog.user && blog.user.id !== currentInfo?.id)
          .map((blog) => (
            <Block
              key={blog.id} // Add key for list items
              className={`p-4 rounded-lg border mt-4 ${
                theme === "dark"
                  ? "border-custom-zinc bg-zinc-700"
                  : "border-gray-300 bg-white"
              } shadow-sm`}
            >
              <div className="flex items-center mb-4">
                {blog.user?.profile_image ? (
                  <img
                    src={blog.user.profile_image}
                    alt="avatar"
                    className={`size-12 rounded-full ${
                      theme === "dark" ? "border-white" : "border-black"
                    }`}
                  />
                ) : (
                  <MdPerson
                    className={`w-12 h-12 ${
                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                )}
                <div className="ml-2">
                  <h1
                    className={`text-base font-bold leading-tight ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    <span>{blog.user?.username || "Unknown"}</span>
                  </h1>
                  <p
                    className={`text-gray-500 text-14 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {formatDate(blog.created_date)}
                  </p>
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
              <div className="flex flex-col items-center p-4">
                {/* Kiểm tra và hiển thị các phương tiện truyền thông nếu có */}
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
                    {blog.media.map((media) => renderMedia(media, theme))}
                  </div>
                )}
              </div>
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
                  {blog.likes_count || 0} lượt thích •{" "}
                  {blog.comments_count || 0} bình luận
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
                </div>
                <IoShareSocialOutline
                  className={`text-2xl cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                  onClick={() => handleCopyLink(blog.id)}
                />
              </div>
            </Block>
          ))
      )}
    </>
  );
};

export default PersonalBlog;
