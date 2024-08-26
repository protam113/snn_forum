import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/themeContext";
import useBlog from "../../hooks/useBlog";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../pages/error/load";
import useUserInfo from "../../hooks/useUserInfo";
import formatDate from "../../utils/formatDate";
import { BsThreeDots } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import ReplyComment from "./ReplyComment";

const CommentsSection = () => {
  const { theme } = useTheme();
  const { id: blogId } = useParams();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const {
    blog,
    comments,
    commentChild,
    loading,
    error,
    handleDeleteComment,
    loadMoreComments,
    hasMoreComments,
    fetchComments,
  } = useBlog(blogId);
  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [activeReply, setActiveReply] = useState(null);

  const handleCommentMenuClick = (commentId) => {
    setActiveCommentMenu((prev) => (prev === commentId ? null : commentId));
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId, fetchComments]);

  const handleReplyClick = (commentId) => {
    setActiveReply((prev) => (prev === commentId ? null : commentId));
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!blog) {
    return <p className="text-gray-500">No blog found.</p>;
  }

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
                        {userInfo?.username === comment.user.username && (
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
                <button
                  className={`text-blue-500 text-sm ${
                    activeReply === comment.id ? "font-bold" : ""
                  }`}
                  onClick={() => handleReplyClick(comment.id)}
                >
                  Reply
                </button>
              </p>
              {activeReply === comment.id && userInfo && (
                <ReplyComment
                  blogId={blogId}
                  parentId={comment.id}
                  onReplyAdded={() => setActiveReply(null)}
                />
              )}

              {/* Replies */}
              {commentChild
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
                        {userInfo?.username === reply.user.username && (
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
            </div>
          ))
        ) : (
          <p className={`text-${theme === "dark" ? "gray-400" : "gray-500"}`}>
            No comments yet.
          </p>
        )}
      </div>
      {hasMoreComments && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={loadMoreComments}
        >
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default CommentsSection;
