import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../components/design/Block";
import { FaRegCommentAlt, FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useTheme } from "../../../context/themeContext";
import useBlog from "../../../hooks/useBlog";
import formatDate from "../../../utils/formatDate";
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import useUserInfo from "../../../hooks/useUserInfo";
import { Error404 } from "../../error/error";
import { toast } from "react-toastify";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import SkeletonBlog from "../../../components/design/SkeletonBlog";
import { debounce } from "lodash";

const Blog = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [page, setPage] = useState(1);
  const [lastLoadedPage, setLastLoadedPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { blogs, loading, error, likedBlogs, handleDeleteBlog, fetchBlogs } =
    useBlog();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    fetchBlogs(page)
      .then((fetchedBlogs) => {
        if (Array.isArray(fetchedBlogs) && fetchedBlogs.length < 10) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Không thể lấy blog:", error);
      });
  }, [fetchBlogs, page]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollThreshold = documentHeight * 0.7;

      const nextPage = page + 1;

      if (
        scrollTop + windowHeight > scrollThreshold &&
        !loading &&
        hasMore &&
        !loadingMore &&
        nextPage > lastLoadedPage
      ) {
        setLoadingMore(true);

        const fetchNextPage = async () => {
          try {
            await fetchBlogs(nextPage);
            setPage(nextPage);
            setLastLoadedPage(nextPage); // Lưu lại trang cuối cùng đã load
          } catch (error) {
            console.error("Không thể tải thêm blog:", error);
          } finally {
            setLoadingMore(false);
          }
        };

        fetchNextPage();
      }
    }, 300);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, hasMore, loadingMore, fetchBlogs, lastLoadedPage]);

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
      await handleDeleteBlog(blogId);
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

  if (loading)
    return (
      <div className="min-h-screen">
        {/* Hiển thị Skeleton khi đang tải */}
        {[...Array(3)].map((_, index) => (
          <SkeletonBlog key={index} />
        ))}
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
          <React.Fragment key={blog.id}>
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
                  {blog.likes_count} lượt thích • {blog.comment_count} bình luận
                </p>
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
                  />
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
                <div className="flex items-center gap-4">
                  {/* <BsBookmark
                  className={`text-2xl cursor-pointer ${
                    theme === "dark" ? "text-gray-300" : "text-gray-500"
                  }`}
                /> */}
                </div>
              </div>
            </Block>
            {loadingMore && <Loading />}
            {/* {(index + 1) % 2 === 0 && <RandomAd />} */}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Blog;
