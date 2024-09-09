import React, { useState } from "react";
import { useTheme } from "../../context/themeContext";
import useBlog from "../../hooks/useBlog";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../pages/error/load";
import formatDate from "../../utils/formatDate";
import { BsThreeDots } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import ReplyComment from "./ReplyComment";
import useUserInfo from "../../hooks/useUserInfo";
import { useComments } from "../../hooks/Blog/useComment";

const CommentsSection = ({ blogId }) => {
  const { theme } = useTheme();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const {
    commentChild,
    loading,
    error,
    handleDeleteComment,
    handleExpandComment,
  } = useBlog(blogId);

  const {
    data: { pages, pageParams } = { pages: [], pageParams: [] },
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useComments(blogId);

  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [activeReply, setActiveReply] = useState(null);

  const handleCommentMenuClick = (commentId) => {
    setActiveCommentMenu((prev) => (prev === commentId ? null : commentId));
  };

  const handleReplyClick = (commentId) => {
    setActiveReply((prev) => (prev === commentId ? null : commentId));
    if (activeReply !== commentId) {
      handleExpandComment(commentId);
    }
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p className="text-red-500">Error</p>;

  const comments = pages.flatMap((page) => page.parentComments);

  return (
    <div className="comments-section">
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              {/* Parent Comment */}
              <div className="flex items-start mb-2">
                <img
                  src={comment.user.profile_image}
                  alt="profile"
                  className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                  onClick={() => handleProfileClick(comment.user.id)}
                />
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                    onClick={() => handleProfileClick(comment.user.id)}
                  >
                    {comment.user.first_name} {comment.user.last_name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {formatDate(comment.created_date)}
                  </p>
                </div>
                <div className="ml-auto relative">
                  <BsThreeDots
                    className="text-gray-500 text-xl cursor-pointer hover:text-gray-700"
                    onClick={() => handleCommentMenuClick(comment.id)}
                  />
                  {activeCommentMenu === comment.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-300 shadow-lg rounded-lg z-10">
                      <ul className="text-gray-300">
                        {userInfo.id === comment.user.id && (
                          <li
                            className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                            onClick={() =>
                              handleDeleteComment(comment.id, userInfo)
                            }
                          >
                            <FaTrashAlt className="mr-2 text-gray-400" />
                            Delete
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {comment.content}
                <br className="mt-2" />
              </p>
              <div className="flex items-center space-x-2">
                <button
                  className={`text-blue-500 text-sm ${
                    activeReply === comment.id ? "font-bold" : ""
                  }`}
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Reply
                </button>

                <p>• Phản hồi {comment.reply_count}</p>
              </div>
              {/* Replies */}
              {activeReply === comment.id &&
                commentChild
                  .filter((reply) => reply.parent === comment.id)
                  .map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-10 pl-4 border-l-2 border-gray-300 mt-4"
                    >
                      <div className="flex items-start mb-2">
                        <img
                          src={reply.user.profile_image}
                          alt="profile"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold text-sm text-black">
                            {reply.user.first_name} {reply.user.last_name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {formatDate(reply.created_date)}
                          </p>
                        </div>
                        <div className="ml-auto">
                          {userInfo.id === reply.user.id && (
                            <FaTrashAlt
                              onClick={() =>
                                handleDeleteComment(reply.id, userInfo)
                              }
                              className="text-gray-500 cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                      <p className="ml-10 text-black">{reply.content}</p>
                    </div>
                  ))}

              <hr
                className={`my-2 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              />

              {activeReply === comment.id && userInfo && (
                <ReplyComment
                  blogId={blogId}
                  parentId={comment.id}
                  onReplyAdded={() => setActiveReply(null)}
                />
              )}
            </div>
          ))
        ) : (
          <p className={`text-${theme === "dark" ? "gray-400" : "gray-500"}`}>
            No comments yet.
          </p>
        )}
      </div>
      {hasNextPage && (
        <button
          className=" text-blue-500 hover:text-blue-300 text-14 px-4 py-2 rounded mt-4"
          onClick={() => fetchNextPage()}
        >
          Tải Thêm{" "}
        </button>
      )}
    </div>
  );
};

export default CommentsSection;
