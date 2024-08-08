import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../../context/themeContext";
import useBlog from "../../hooks/useBlog";

const ReplyComment = ({ blogId, parentId, onReplyAdded }) => {
  const { theme } = useTheme();
  const { handleAddComment } = useBlog(blogId);
  const [replyText, setReplyText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (replyText.trim() || selectedFile) {
      try {
        await handleAddComment(
          blogId,
          { content: replyText, file: selectedFile },
          parentId
        );
        setReplyText("");
        setSelectedFile(null);
        setError(null);
        if (onReplyAdded) onReplyAdded();
      } catch (error) {
        console.error("Error posting reply:", error);
        setError("Error posting reply. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col p-4 rounded-lg space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center space-x-4">
        <textarea
          value={replyText}
          rows={2}
          onChange={handleReplyChange}
          placeholder="Write a reply..."
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
              className={`rounded-md ${
                selectedFile.type.includes("image/vertical")
                  ? "w-10 h-20"
                  : "w-20 h-10"
              }`}
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

export default ReplyComment;
