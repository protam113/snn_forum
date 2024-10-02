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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdDelete } from "react-icons/md";

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
                  <Menu as="div" className="ml-auto relative">
                    <MenuButton>
                      <BsThreeDots className="text-gray-500 text-xl cursor-pointer hover:text-gray-700" />
                    </MenuButton>

                    <MenuItems
                      as="div"
                      className="absolute right-0 mt-2 w-48 bg-white-blue1 border border-gray-300 shadow-lg rounded-lg z-10"
                    >
                      <MenuItem as="div">
                        <div
                          className="px-4 py-2 hover:bg-milk-blue1 hover:text-black cursor-pointer flex items-center"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <FaTrashAlt className="mr-2 text-gray-400" />
                          Xóa
                        </div>
                      </MenuItem>
                      <MenuItem as="div">
                        <div
                          className="px-4 py-2 hover:bg-milk-blue1 hover:text-black cursor-pointer flex items-center"
                          onClick={() => setEditingComment(comment)}
                        >
                          <FaEdit className="mr-2 text-gray-400" />
                          Chỉnh Sửa
                        </div>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
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
                              <Menu as="div" className="ml-auto relative">
                                <MenuButton>
                                  <BsThreeDots className="text-gray-500 text-xl cursor-pointer" />
                                </MenuButton>
                                <MenuItems
                                  as="div"
                                  className="absolute right-0 mt-2 w-48 bg-white-blue1 border border-gray-300 shadow-lg rounded-lg z-10"
                                >
                                  <MenuItem as="div">
                                    <div
                                      className="px-4 py-2 hover:bg-milk-blue1  cursor-pointer flex items-center"
                                      onClick={() =>
                                        handleDeleteComment(child.id)
                                      }
                                    >
                                      <FaTrashAlt className="mr-2 text-gray-400" />
                                      Xóa
                                    </div>
                                  </MenuItem>
                                  <MenuItem as="div">
                                    <div
                                      className="px-4 py-2 hover:bg-milk-blue1  cursor-pointer flex items-center"
                                      onClick={() => setEditingComment(child)}
                                    >
                                      <FaEdit className="mr-2 text-gray-400" />
                                      Chỉnh Sửa
                                    </div>
                                  </MenuItem>
                                </MenuItems>
                              </Menu>
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
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
            <div class="my-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-14 fill-red-500 inline"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                  data-original="#000000"
                />
                <path
                  d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                  data-original="#000000"
                />
              </svg>
              <h4 class="text-gray-800 text-base font-semibold mt-4">
                {" "}
                Bạn có chắc chắn muốn xóa comment này không?
              </h4>

              <div class="text-center space-x-4 mt-8">
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
