import React, { useState } from "react";
import { FaUpload, FaPaperPlane, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useBlog from "../../hooks/useBlog";
import { useTheme } from "../../context/themeContext";
import useTokenCheck from "../../hooks/useTokenCheck";

const Comment = ({ blogId }) => {
  const hasToken = useTokenCheck();
  const { theme } = useTheme();
  const { handleAddComment } = useBlog(blogId);
  const [selectedFile, setSelectedFile] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentText.trim() || selectedFile) {
      try {
        await handleAddComment(blogId, {
          content: commentText,
          file: selectedFile,
        });
        setCommentText("");
        setSelectedFile(null);
        setError(null);
      } catch (error) {
        console.error("Error posting comment:", error);
        setError("Error posting comment. Please try again.");
      }
    }
  };

  if (!hasToken) {
    return (
      <div className="flex flex-col p-4 rounded-lg space-y-4">
        <Link
          to="/login"
          className="flex items-center px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all"
        >
          <FaExclamationTriangle className="mr-2" />
          <span>Login/Register to comment on the blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 rounded-lg space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <FaUpload className="text-custom-red" />
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
        <textarea
          type="text"
          value={commentText}
          rows={2}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className={`flex-grow rounded-md border-b-2 ${
            theme === "dark" ? "text-white" : "text-black"
          } ${theme === "dark" ? "border-zinc-400" : "border-zinc-500"} ${
            theme === "dark" ? "bg-zinc-800" : "bg-white"
          } focus:outline-none focus:ring-2 focus:ring-gray-500`}
        />
        <button
          onClick={handleSubmit}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-custom-red hover:bg-gray-600 text-white"
        >
          <FaPaperPlane />
        </button>
      </div>
      {selectedFile && (
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              className="rounded-md w-20 h-10"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
