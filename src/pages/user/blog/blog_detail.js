import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaTrashAlt,
  FaEdit,
  FaFlag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import Loading from "../../error/load";
import Likeblog from "../../../components/buttons/likeBlog";
import formatDate from "../../../utils/formatDate";
import Comment from "../../../components/comment/comment";
import { useTheme } from "../../../context/themeContext";
import useBlog from "../../../hooks/useBlog";
import { Error404 } from "../../error/error";
import RecentFeed from "./feed/RecenFeed";
import SEO from "../../../components/layouts/DefaultLayout/components/SEO";
import { toast } from "react-toastify";
import { MdPerson } from "react-icons/md";
import useUserInfo from "../../../hooks/useUserInfo";
import { useBlogDetail } from "../../../hooks/Blog/useBlog";
import CommentsSection from "../../../components/comment/CommentsSection";
import { useDeleteBlog } from "../../../hooks/Blog/useBlogs";

const Blog_detail = () => {
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError } = useBlogDetail(blogId);
  const { mutate: deleteBlogMutation } = useDeleteBlog();
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleMenuClick = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  const handleDeleteClick = async (blogId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa blog này không?")) {
      try {
        await deleteBlogMutation({ blogId });
        navigate("/");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };
  const handleEditClick = (blogId) => {
    navigate(`/blog/edit/${blogId}`);
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
      });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blog.media.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + blog.media.length) % blog.media.length
    );
  };

  const renderMedia = (media) => {
    const extension = media.file.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return (
        <div
          key={media.file}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src={media.file}
            alt="blog-media"
            className={`object-contain w-full h-auto max-h-[80vh] cursor-pointer ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          />
          <FaChevronLeft
            className="absolute left-0 text-3xl cursor-pointer bg-gray-800 bg-opacity-50 p-2 rounded-full text-white"
            onClick={prevSlide}
          />
          <FaChevronRight
            className="absolute right-0 text-3xl cursor-pointer bg-gray-800 bg-opacity-50 p-2 rounded-full text-white"
            onClick={nextSlide}
          />
        </div>
      );
    } else if (["pdf"].includes(extension)) {
      return (
        <div key={media.file} className="w-full flex justify-center">
          <iframe
            src={media.file}
            className="w-full h-[70vh] md:w-[400px] md:h-[500px]"
            frameBorder="0"
            title="PDF Viewer"
          />
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Error404 />
      </div>
    );

  if (!blog) {
    return <p className="text-gray-500">No blog found.</p>;
  }

  return (
    <>
      <SEO
        title={blog.content || "Blog Detail"}
        description={blog.content || "Details of the blog"}
        name="XLR Team"
        type="article"
      />
      <article className="w-full max-w-2xl mx-auto py-8 px-4 md:px-6">
        <div className="max-w-6xl w-full">
          {/* Post Information and 3-dots menu */}
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
                    {userInfo.id === blog.user.id && (
                      <>
                        <li
                          className="px-4 py-2 text-14 hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center"
                          onClick={() => handleEditClick(blog.id)}
                        >
                          <FaEdit className="mr-2 text-gray-400" />
                          Chỉnh sửa
                        </li>
                        <li
                          className="px-4 py-2 text-14 hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center"
                          onClick={() => handleDeleteClick(blog.id, userInfo)}
                        >
                          <FaTrashAlt className="mr-2 text-gray-400" />
                          Xóa
                        </li>
                      </>
                    )}

                    <li className="px-4 py-2 text-14 hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center">
                      <FaFlag className="mr-2 text-gray-400" />
                      Báo Cáo
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
          <div className="relative w-full max-w-3xl mx-auto">
            {blog.media.length > 0 && (
              <div className="relative">
                {blog.media.map((media, index) => (
                  <div
                    key={media.file}
                    className={`${
                      index === currentSlide ? "block" : "hidden"
                    } w-full`}
                  >
                    {renderMedia(media)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Like, Comment, Repost Buttons */}
          <div className="mt-4">
            <hr className="my-2 border-zinc-900" />
            <p
              className={`text-gray-500 text-sm cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {blog.likes_count} lượt thích {blog.comment_count} bình luận
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Likeblog blogId={blog.id} liked={blog.liked} />
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
          </div>
          <hr className="my-2 border-zinc-900" />
          <CommentsSection blogId={blogId} />
          <Comment blogId={blogId} />
        </div>
        <hr className="my-4 border-zinc-900" />
        <h1 className="font-bold text-custom-red text-20">Recent Feed</h1>
        <RecentFeed />{" "}
      </article>
    </>
  );
};

export default memo(Blog_detail);
