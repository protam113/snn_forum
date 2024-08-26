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
import useUserInfo from "../../../hooks/useUserInfo";
import formatDate from "../../../utils/formatDate";
import Comment from "../../../components/comment/comment";
import { useTheme } from "../../../context/themeContext";
import useBlog from "../../../hooks/useBlog";
import CommentsSection from "../../../components/comment/CommentsSection";
import { Error404 } from "../../error/error";
import RecentFeed from "./feed/RecenFeed";
import SEO from "../../../components/layouts/DefaultLayout/components/SEO";
import { toast } from "react-toastify";

const Blog_detail = () => {
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const {
    blog,
    loading,
    message,
    handleDeleteBlog,
    likedBlogs,
    getBlogLikes,
    fetchBlog,
    setLikeList,
  } = useBlog(blogId);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLikesPopup, setShowLikesPopup] = useState(null);
  const [likesData, setLikesData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    if (blogId) {
      getBlogLikes(blogId).then(setLikeList).catch(console.error);
    }
  }, [blogId, getBlogLikes]);

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
            src={blog.media[currentSlide].file}
            alt="blog-media"
            className={`object-cover w-[500px] h-full cursor-pointer ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          />
          <FaChevronLeft
            className="absolute left-0 text-3xl cursor-pointer"
            onClick={prevSlide}
          />
          <FaChevronRight
            className="absolute right-0 text-3xl cursor-pointer"
            onClick={nextSlide}
          />
        </div>
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blog]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
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
    <>
      <SEO
        title={blog.content || "Blog Detail"}
        description={blog.content || "Details of the blog"}
        name="XLR Team"
        type="article"
      />
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
                          Chỉnh sửa
                        </li>
                        <li
                          className="px-4 py-2 text-14  hover:bg-zinc-200 hover:text-black cursor-pointer flex items-center"
                          onClick={() => handleDeleteBlog(blog.id, userInfo)}
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
          {blog.media.length > 0 && (
            <div className="relative">
              {blog.media.map((media, index) => (
                <div
                  key={media.file}
                  className={`${index === currentSlide ? "block" : "hidden"}`}
                >
                  {renderMedia(media)}
                </div>
              ))}
              {/* Next and Previous buttons */}
              <button onClick={prevSlide}></button>
              <button onClick={nextSlide}></button>
            </div>
          )}

          {/* Like, Comment, Repost Buttons */}
          <div className="mt-4">
            <hr className="my-2 border-zinc-900" />
            <p
              className={`text-gray-500 text-sm cursor-pointer ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              onClick={() => handleLikesClick(blog.id)}
              onMouseEnter={() => handleLikesClick(blog.id)}
              onMouseLeave={() => setShowLikesPopup(null)}
            >
              {blog.likes_count} lượt thích • {blog.comment_count} bình luận
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Likeblog
                  blogId={blog.id}
                  liked={likedBlogs[blog.id] || false}
                  onLike={handleLike}
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
          </div>
          <hr className="my-2 border-zinc-900" />
          <CommentsSection />
          <Comment blogId={blogId} />
        </div>
        <hr className="my-4 border-zinc-900" />
        <h1 className="font-bold text-custom-red text-20">Recent Feed</h1>
        <RecentFeed />{" "}
      </div>
    </>
  );
};

export default memo(Blog_detail);
