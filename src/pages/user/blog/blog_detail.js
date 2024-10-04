import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaTrashAlt,
  FaEdit,
  FaFlag,
  FaChevronLeft,
  FaChevronRight,
  FaRegCommentAlt,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import Loading from "../../error/load";
import formatDate from "../../../utils/formatDate";
import Comment from "../../../components/comment/comment";
import { useTheme } from "../../../context/themeContext";
import { Error404 } from "../../error/error";
import RecentFeed from "./feed/RecenFeed";
import SEO from "../../../components/layouts/DefaultLayout/components/SEO";
import { useBlogDetail } from "../../../hooks/Blog/useBlog";
import CommentsSection from "../../../components/comment/CommentsSection";
import { useDeleteBlog } from "../../../hooks/Blog/useBlogs";
import { useToastDesign } from "../../../context/ToastService";
import { useUser } from "../../../context/UserProvider";
import LikePost from "../../../components/buttons/likeBlog";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const ArticleDesign = ({ children }) => {
  return (
    <article className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6 flex cursor-pointer ">
      {children}
    </article>
  );
};

const Blog_detail = () => {
  const { theme } = useTheme();
  const { userInfo } = useUser();
  const { id: blogId } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError } = useBlogDetail(blogId);
  const { mutate: deleteBlogMutation } = useDeleteBlog();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addNotification } = useToastDesign();

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
        addNotification("Link copied to clipboard!", "success");
      })
      .catch((err) => {
        console.error("Failed to copy link");
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
      <ArticleDesign>
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
        {/* Post Information and 3-dots menu */}
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
              </MenuItems>
            </Menu>
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
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1 cursor-pointer">
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
      </ArticleDesign>
      <hr className="my-2 border-zinc-900" />
      <div className="comments-container flex flex-col">
        <div className="comments-section overflow-y-auto max-h-[300px] mb-4">
          <CommentsSection blogId={blogId} />
        </div>
        <Comment blogId={blogId} />
      </div>
      <hr className="my-4 border-zinc-900" />
      <h1
        className={`font-bold ${
          theme === "dark" ? "text-white" : "text-black"
        }  text-20`}
      >
        Bài viết mới
      </h1>
      <RecentFeed />{" "}
    </>
  );
};

export default memo(Blog_detail);

{
  /* <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white dark:bg-gray-700 shadow-sm hover:border hover:border-gray-600">
{/* Votes 
<div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 dark:bg-gray-800 p-4 text-gray-400">
  <ArrowUpIcon
    onClick={() => upVote(true)}
    className={`voteButtons hover:text-blue-400 ${
      vote && "text-blue-400"
    }`}
  />
  <p className="text-xs font-bold text-black dark:text-gray-50">
    {displayVotes(data)}
  </p>
  <ArrowDownIcon
    onClick={() => upVote(false)}
    className={`voteButtons hover:text-red-400  ${
      vote === false && "text-red-400"
    }`}
  />
</div>

<div className="p-3 pb-1">
  {/* Header 
  <div className="flex items-center space-x-2">
    {/* @ts-expect-error Server Component
    <Avatar seed={post.subreddit.topic} /> 
    <Image
      src={`https://avatars.dicebear.com/api/open-peeps/${
        post.subreddit.topic || post.username || "placeholder"
      }.svg`}
      alt="Avatar Image"
      width={50}
      height={50}
      className={`rounded-full border-gray-300 bg-white h-10 w-10`}
    />
    <p className="text-xs text-gray-400">
      <Link href={`/subreddit/${post.subreddit.topic}`}>
        <span className="font-bold text-black dark:text-gray-300 hover:text-blue-400 hover:underline">
          r/{post.subreddit.topic}
        </span>{" "}
      </Link>
      · Posted by u/{post.username} <Time date={post.created_at} />
    </p>
  </div>

  {/* Body 
  <div className="py-4">
    <Link href={`/post/${post.id}`}>
      {" "}
      <h2 className="text-xl font-semibold dark:text-gray-300">
        {post.title}
      </h2>
    </Link>
    <h2 className="mt-2 text-sm font-light dark:text-gray-300">
      {post.body}
    </h2>
  </div>

  {/* Image 
  <img src={post.image} alt="" className="w-full" />

  {/* Footer *
  <div className="flex space-x-4 text-gray-400">
    <div className="postButtons">
      <ChatBubbleBottomCenterIcon className="h-6 w-6" />
      <p className="">{post.comment.length} Comments</p>
    </div>
    <div className="postButtons">
      <GiftIcon className="h-6 w-6" />
      <p className="hidden sm:inline">Award</p>
    </div>
    <div className="postButtons">
      <ShareIcon className="h-6 w-6" />
      <p className="hidden sm:inline">Share</p>
    </div>
    <div className="postButtons">
      <BookmarkIcon className="h-6 w-6" />
      <p className="hidden sm:inline">Save</p>
    </div>
    <div className="postButtons">
      <EllipsisHorizontalIcon className="h-6 w-6" />
    </div>
  </div>
</div>
</div> */
}
