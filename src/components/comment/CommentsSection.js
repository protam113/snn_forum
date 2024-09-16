import React, { useState } from "react";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/error/load";
import formatDate from "../../utils/formatDate";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReplyComment from "./ReplyComment";
import {
  useCommentChild,
  useComments,
  useDeleteComment,
  useEditComment,
} from "../../hooks/Blog/useComment";
import EditCommentPopup from "./components/EditCommentPopup";
import { useUser } from "../../context/UserProvider";

const CommentsSection = ({ blogId }) => {
  const { theme } = useTheme();
  const { userInfo } = useUser();
  const [editingComment, setEditingComment] = useState(null);
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const { mutate: deleteComment } = useDeleteComment(blogId);
  const { mutate: editComment } = useEditComment();
  const {
    data: { pages } = { pages: [], pageParams: [] },
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useComments(blogId);

  const [activeCommentMenu, setActiveCommentMenu] = useState(null);
  const [activeCommentChildMenu, setActiveCommentChildMenu] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
  const [replyLimit, setReplyLimit] = useState(5);

  const {
    data: { pages: commentChild = [] } = { pages: [] },
    isLoading: isChildLoading,
    isError: isChildError,
    fetchNextPage: fetchNextChildPage,
    hasNextPage: hasNextChildPage,
  } = useCommentChild(activeReply);

  const handleEditComment = (updatedComment) => {
    if (!updatedComment || !updatedComment.id) {
      console.error("Invalid comment data");
      return;
    }

    editComment(
      { commentId: updatedComment.id, contentData: updatedComment },
      {
        onSuccess: () => setEditingComment(null),
      }
    );
  };

  const handleDeleteComment = (commentId) => {
    setShowConfirmDelete(true);
    setActiveCommentMenu(commentId);
  };

  const confirmDelete = () => {
    deleteComment({ commentId: activeCommentMenu });
    setShowConfirmDelete(false);
    setActiveCommentMenu(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setActiveCommentMenu(null);
  };

  const handleCommentChildMenuClick = (commentId) => {
    setActiveCommentChildMenu((prev) =>
      prev === commentId ? null : commentId
    );
  };

  const handleCommentMenuClick = (commentId) => {
    setActiveCommentMenu((prev) => (prev === commentId ? null : commentId));
  };

  const handleReplyClick = (commentId) => {
    setActiveReply((prev) => (prev === commentId ? null : commentId));
    if (activeReply !== commentId) {
      fetchNextChildPage();
    }
  };

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id) {
      navigate(`/profile/${userInfo.id === personId ? userInfo.id : personId}`);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">Error</p>;

  const comments = pages.flatMap((page) => page.parentComments);

  return (
    <div className="comments-section">
      <div className="space-y-4">
        {comments.map((comment) =>
          comment && comment.user ? (
            <div key={comment.id} className="mb-4">
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
                {userInfo && userInfo.id === comment.user.id && (
                  <div className="ml-auto relative">
                    <BsThreeDots
                      className="text-gray-500 text-xl cursor-pointer hover:text-gray-700"
                      onClick={() => handleCommentMenuClick(comment.id)}
                    />
                    {activeCommentMenu === comment.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-gray-300 shadow-lg rounded-lg z-10">
                        <ul className="text-gray-300">
                          <li
                            className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <FaTrashAlt className="mr-2 text-gray-400" />
                            Xóa
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                            onClick={() => setEditingComment(comment)}
                          >
                            <FaEdit className="mr-2 text-gray-400" />
                            Chỉnh Sửa
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <p
                className={`text-sm ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {comment.content}
                <br className="mt-2" />
                {comment.file && (
                  <div className="mt-2">
                    <img
                      src={comment.file}
                      alt="comment file"
                      className="w-full h-auto max-h-80 object-contain rounded-lg"
                    />
                  </div>
                )}
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

              {/* Display comment replies with pagination */}
              {activeReply === comment.id && (
                <>
                  {commentChild[0]?.commentChild
                    .filter((child) => child.parent === comment.id)
                    .slice(0, replyLimit)
                    .map((child) => (
                      <div
                        key={child.id}
                        className="ml-10 pl-4 border-l-2 border-gray-300 mt-4"
                      >
                        <div className="flex items-start mb-2">
                          <img
                            src={child.user.profile_image}
                            alt="profile"
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <p className="font-semibold text-sm text-black">
                              {child.user.first_name} {child.user.last_name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {formatDate(child.created_date)}
                            </p>
                          </div>
                          <div className="ml-auto">
                            {userInfo.id === child.user.id && (
                              <div className="ml-auto relative">
                                <BsThreeDots
                                  className="text-gray-500 text-xl cursor-pointer"
                                  onClick={() =>
                                    handleCommentChildMenuClick(child.id)
                                  }
                                />
                                {activeCommentChildMenu === child.id && (
                                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-gray-300 shadow-lg rounded-lg z-10">
                                    <ul className="text-gray-300">
                                      <li
                                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                                        onClick={() =>
                                          handleDeleteComment(child.id)
                                        }
                                      >
                                        <FaTrashAlt className="mr-2 text-gray-400" />
                                        Xóa
                                      </li>
                                      <li
                                        className="px-4 py-2 hover:bg-gray-200 hover:text-black cursor-pointer flex items-center"
                                        onClick={() => setEditingComment(child)}
                                      >
                                        <FaEdit className="mr-2 text-gray-400" />
                                        Chỉnh Sửa
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="ml-10 text-black">{child.content}</p>
                      </div>
                    ))}

                  {commentChild[0]?.commentChild.filter(
                    (child) => child.parent === comment.id
                  ).length > replyLimit && (
                    <button
                      className="text-blue-500 hover:text-blue-300 text-sm px-4 py-2 rounded mt-4"
                      onClick={() => setReplyLimit(replyLimit + 5)}
                    >
                      Tải Thêm Phản Hồi
                    </button>
                  )}
                </>
              )}
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
          ) : null
        )}
      </div>
      {hasNextPage && (
        <button
          className="text-blue-500 hover:text-blue-300 text-sm px-4 py-2 rounded mt-4"
          onClick={() => fetchNextPage()}
        >
          Tải Thêm
        </button>
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Bạn có chắc chắn muốn xóa comment này không?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      {editingComment && (
        <EditCommentPopup
          comment={editingComment}
          onClose={() => setEditingComment(null)}
          onSave={handleEditComment}
        />
      )}
    </div>
  );
};

export default CommentsSection;
