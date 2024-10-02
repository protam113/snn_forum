import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useTheme } from "../../context/themeContext";
import { useAddComment } from "../../hooks/Blog/useComment";
import { AiOutlineWarning } from "react-icons/ai";

const ReplyComment = ({ blogId, parentId, onReplyAdded }) => {
  const { theme } = useTheme();
  const { mutate: addComment } = useAddComment();
  const [replyText, setReplyText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

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
        const commentData = {
          content: replyText || "",
          file: selectedFile || null,
        };

        addComment({ blogId, contentData: commentData, parentId });

        setReplyText("");
        setSelectedFile(null);
        setError(null);

        if (onReplyAdded) onReplyAdded();
      } catch (error) {
        console.error("Error posting reply:", error);
        setError("Error posting reply. Please try again.");
      }
    } else {
      setError("Reply text or file is required.");
    }
  };

  return (
    <div className="flex flex-col p-4 rounded-lg space-y-4">
      {error && (
        <div className="mb-4 p-4 text-14 bg-red-100 text-main-blue2 border border-red-300 rounded-lg flex items-center">
          <AiOutlineWarning size={24} className="mr-2 text-main-blue2" />
          <span> {error}</span>
        </div>
      )}
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
              className="absolute top-0 right-0 bg-main-blue2 text-white rounded-full w-4 h-4 flex items-center justify-center"
            >
              x
            </button>
          </div>
        </div>
      )}
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
          className="w-10 h-10 flex items-center justify-center rounded-full bg-main-blue2 hover:bg-gray-600 text-white"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ReplyComment;
