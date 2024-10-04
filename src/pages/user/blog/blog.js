import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCommentAlt, FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "../../../context/themeContext";
import formatDate from "../../../utils/formatDate";
import { IoShareSocialOutline } from "react-icons/io5";
import SkeletonBlog from "../../../components/design/SkeletonBlog";
import { debounce } from "lodash";
import { useBlogList, useDeleteBlog } from "../../../hooks/Blog/useBlogs";
import { useToastDesign } from "../../../context/ToastService";
import { useUser } from "../../../context/UserProvider";
import LikePost from "../../../components/buttons/likeBlog";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Blog = () => {
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addNotification } = useToastDesign();
  const { userInfo } = useUser();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useBlogList();
  const { mutate: deleteBlogMutation } = useDeleteBlog();

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

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };
  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
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

  const handleToggleExpand = (blogId) => {
    setExpandedBlogId((prev) => (prev === blogId ? null : blogId));
  };

  const handleCopyLink = (blogId) => {
    const blogUrl = `${window.location.origin}/blog/${blogId}`;
    navigator.clipboard
      .writeText(blogUrl)
      .then(() => {
        addNotification("Link copied to clipboard!", "success");
      })
      .catch((error) => {
        console.error("Failed to copy link");
      });
  };

  const renderMedia = (media) => {
    const extension = media.file.split(".").pop().toLowerCase();
    const optimizedImageUrl = `${media.file}?resize=720`; // Resize to 720p for faster loading

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <img
          key={media.file}
          src={optimizedImageUrl}
          alt="blog-media"
          className={`object-cover w-full sm:h-64 md:h-80 lg:h-96 xl:h-auto cursor-pointer ${
            theme === "dark" ? "border-gray-800" : "border-white"
          }`}
        />
      );
    } else if (["pdf"].includes(extension)) {
      return (
        <div key={media.file} className="w-full items-center justify-center">
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
  return (
    <div className="post-list">
      {data?.pages
        .flatMap((page) => page.blogs)
        ?.map((blog) => {
          const isOwner = userInfo && userInfo.id === blog.user.id;
          const isExpanded = expandedBlogId === blog.id;

          return (
            <div
              key={blog.id}
              className={`rounded-lg border   p-4 mt-4 ${
                theme === "dark"
                  ? "border-gray-700"
                  : "border-primary-border-50"
              }`}
            >
              <div className="flex">
                {/* Phần vote giống Reddit */}
                <div className="flex flex-col items-center justify-start space-y-2 pr-4 border-r dark:border-gray-700">
                  <button className="text-gray-400 hover:text-red-500">
                    <LikePost blogId={blog.id} liked={blog.liked} />{" "}
                  </button>
                  <span className="font-bold text-gray-600 dark:text-gray-300">
                    {blog.likes_count}
                  </span>
                  {/* <button className="text-gray-400 hover:text-blue-500">
                <FaArrowDown />
              </button> */}
                </div>

                {/* Nội dung bài viết */}
                <div className="p-3 pb-1 flex-1">
                  <div className="flex items-center mb-4">
                    <img
                      src={blog.user.profile_image}
                      alt="avatar"
                      className="w-10 h-10 rounded-full cursor-pointer"
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
                        className={`text-sm ${
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
                        {isOwner && (
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
                        )}
                        <MenuItem>
                          <div className="px-4 py-2 hover:bg-gray-100 0 cursor-pointer flex items-center">
                            <FaFlag className="mr-2 text-gray-400" />
                            Báo cáo
                          </div>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                  <div onClick={() => handleBlogClick(blog.id)}>
                    {/* Tiêu đề và nội dung */}
                    <h2 className="text-lg font-semibold mb-2 dark:text-gray-300">
                      {blog.title}
                    </h2>
                    <p
                      className={`mb-8 text-sm cursor-pointer font-semibold ${
                        theme === "dark" ? "text-gray-300" : "text-black"
                      }`}
                    >
                      {blog.content}
                    </p>
                    <div
                      className={`mb-8 text-sm ${
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
                  </div>

                  {!isExpanded &&
                    blog.description &&
                    blog.description.length > 300 && (
                      <p
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleToggleExpand(blog.id)}
                      >
                        Xem thêm
                      </p>
                    )}
                  {isExpanded && blog.description && (
                    <p
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleToggleExpand(blog.id)}
                    >
                      Ẩn bớt
                    </p>
                  )}
                  {/* Media */}
                  {/* <div className="flex flex-col items-center p-4">
                    {blog.media && blog.media.length > 0 && (
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
                  </div> */}
                  {blog.media && blog.media.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {blog.media.map((media) => renderMedia(media, theme))}
                    </div>
                  )}

                  {/* Các nút tương tác */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex space-x-4">
                      <div
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => handleBlogClick(blog.id)}
                      >
                        <FaRegCommentAlt />
                        <span>{blog.comment_count} bình luận</span>
                      </div>
                      <div
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() => handleCopyLink(blog.id)}
                      >
                        <IoShareSocialOutline />
                        <span>Chia sẻ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Blog;
