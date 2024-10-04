import React, { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Block from "../../../../components/design/Block";
import { FaEdit, FaRegCommentAlt, FaTrashAlt } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useTheme } from "../../../../context/themeContext";
import formatDate from "../../../../utils/formatDate";
import LikePost from "../../../../components/buttons/likeBlog";
import { BsThreeDots } from "react-icons/bs";
import { useDeleteBlog } from "../../../../hooks/Blog/useBlogs";
import { useUserBlog } from "../../../../hooks/User/useUserBlog";
import SkeletonBlog from "../../../../components/design/SkeletonBlog";
import { debounce } from "lodash";
import { useToastDesign } from "../../../../context/ToastService";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const PersonalBlog = () => {
  const { id: personId } = useParams();
  const { mutate: deleteBlogMutation } = useDeleteBlog();
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useUserBlog(personId);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [expandedBlogs, setExpandedBlogs] = React.useState({});
  const { addNotification } = useToastDesign();

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

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleToggleExpand = (blogId) => {
    setExpandedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };
  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này không?")) {
      try {
        await deleteBlogMutation({ blogId });
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleCopyLink = (blogId) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`;
    navigator.clipboard
      .writeText(blogUrl)
      .then(() => {
        addNotification("Link copied to clipboard!", "success");
      })
      .catch((error) => {
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

  if (isFetching && !data)
    return (
      <div className="min-h-screen">
        {[...Array(3)].map((_, index) => (
          <SkeletonBlog key={index} />
        ))}
      </div>
    );

  const posts = data?.pages.flatMap((page) => page.recruitments) || [];
  return (
    <>
      {posts.length === 0 ? (
        <p>Không có bài viết nào để hiển thị.</p>
      ) : (
        posts.map((blog) => (
          <Block
            key={blog.id} // Add key for list items
            className={`p-4 rounded-lg border mt-4 ${
              theme === "dark"
                ? "border-custom-zinc bg-zinc-700"
                : "border-gray-300 bg-white"
            } shadow-sm`}
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
              <Menu as="div" className="ml-auto relative">
                <MenuButton>
                  <BsThreeDots
                    className={`text-2xl cursor-pointer ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-gray-200"
                        : "text-black hover:text-gray-700"
                    }`}
                  />
                </MenuButton>
                <MenuItems
                  as="div"
                  className="absolute right-0 mt-2 w-48 bg-white  border border-gray-300 shadow-lg rounded-lg z-10"
                >
                  <>
                    <MenuItem>
                      <div
                        className="px-4 py-2 hover:bg-gray-100  cursor-pointer flex items-center"
                        onClick={() => handleEditClick(blog.id)}
                      >
                        <FaEdit className="mr-2 text-gray-400" />
                        Chỉnh sửa
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        className="px-4 py-2 hover:bg-gray-100  cursor-pointer flex items-center"
                        onClick={() => handleDeleteClick(blog.id)}
                      >
                        <FaTrashAlt className="mr-2 text-gray-400" />
                        Xóa
                      </div>
                    </MenuItem>
                  </>
                </MenuItems>
              </Menu>
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
                {blog.likes_count || 0} lượt thích • {blog.comments_count || 0}{" "}
                bình luận
              </p>
            </div>
            <hr
              className={`my-2 ${
                theme === "dark" ? "border-gray-600" : "border-zinc-900"
              }`}
            />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <LikePost blogId={blog.id} liked={blog?.liked} />
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
