import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../components/design/Block";
import { FaRegCommentAlt, FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "../../../context/themeContext";
import formatDate from "../../../utils/formatDate";
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import SkeletonBlog from "../../../components/design/SkeletonBlog";
import { debounce } from "lodash";
import { useBlogList, useDeleteBlog } from "../../../hooks/Blog/useBlogs";
import { useToastDesign } from "../../../context/ToastService";
import { useUser } from "../../../context/UserProvider";

const Blog = () => {
  const [activeMenu, setActiveMenu] = useState(null);
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

  const handleMenuClick = (blogId) => {
    setActiveMenu((prev) => (prev === blogId ? null : blogId));
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

  return (
    <div className="post-list">
      {data?.pages
        .flatMap((page) => page.blogs)
        ?.map((blog) => {
          const isOwner = userInfo && userInfo.id === blog.user.id;
          const isExpanded = expandedBlogId === blog.id;

          return (
            <div key={blog.id}>
              <Block
                className={`p-4 rounded-lg border mt-4 ${
                  theme === "dark"
                    ? "border-custom-zinc bg-zinc-800"
                    : "border-gray-300 bg-white"
                } shadow-sm`}
              >
                <div className="flex items-center mb-4">
                  {blog.user.profile_image ? (
                    <img
                      src={blog.user.profile_image}
                      alt="avatar"
                      className={`size-12 rounded-full ${
                        theme === "dark" ? "border-white" : "border-black"
                      }`}
                      onClick={() => handleProfileClick(blog.user.id)}
                    />
                  ) : (
                    <MdPerson
                      className={`size-12 rounded-full ${
                        theme === "dark" ? "text-white" : "text-gray-500"
                      }`}
                      onClick={() => handleProfileClick(blog.user.id)}
                    />
                  )}
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
                <div onClick={() => handleBlogClick(blog.id)}>
                  <h2
                    className={`mb-8 text-xl font-semibold ${
                      theme === "dark" ? "text-gray-300" : "text-black"
                    }`}
                  >
                    {blog.title}
                  </h2>
                  <p
                    className={`mb-8 text-15 cursor-pointer font-semibold ${
                      theme === "dark" ? "text-gray-300" : "text-black"
                    }`}
                  >
                    {blog.content}
                  </p>
                  <div
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
                </div>
                {!isExpanded &&
                  blog.description &&
                  blog.description.length > 300 && (
                    <p
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleToggleExpand(blog.id)}
                    >
                      Thêm
                    </p>
                  )}
                {isExpanded && blog.description && (
                  <p
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleToggleExpand(blog.id)}
                  >
                    Ẩn Bớt
                  </p>
                )}

                <div className="flex flex-col items-center p-4">
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
                    {blog.likes_count} lượt thích • {blog.comment_count} bình
                    luận
                  </p>
                </div>
                <hr
                  className={`my-2 ${
                    theme === "dark" ? "border-gray-600" : "border-zinc-900"
                  }`}
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Likeblog blogId={blog.id} liked={blog.liked} />
                    <FaRegCommentAlt
                      className={`text-2xl cursor-pointer ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      }`}
                      onClick={() => handleBlogClick(blog.id)}
                    />
                    <IoShareSocialOutline
                      className={`text-2xl cursor-pointer ${
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      }`}
                      onClick={() => handleCopyLink(blog.id)}
                    />
                  </div>
                </div>
              </Block>
              {isFetchingNextPage && <Loading />}
            </div>
          );
        })}
    </div>
  );
};

export default Blog;
