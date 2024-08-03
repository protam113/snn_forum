import React, { useState, useRef } from "react";
import {
  FaRegFileImage,
  FaTrashAlt,
  FaArrowLeft,
  FaFilePdf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/img/Logo.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "../../../../context/themeContext";
import useBlog from "../../../../hooks/useBlog";
import useUserInfo from "../../../../hooks/useUserInfo";

const Create = () => {
  const { theme } = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const navigate = useNavigate();
  const { handleSubmitBlog, submitting, fileInputRef } = useBlog();
  const { userInfo } = useUserInfo();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length <= 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can only upload up to 4 files.");
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = (event) => {
    handleSubmitBlog(
      event,
      content,
      description,
      visibility,
      () => {
        navigate("/");
      },
      () => {
        console.log("Success Callback");
      }
    );
  };

  return (
    <div className="flex items-center justify-center px-4 py-2">
      <div
        className={`relative max-w-6xl w-full p-6 border rounded-md shadow-lg ${
          theme === "dark"
            ? "border-zinc-800  text-white"
            : "border-white  text-black"
        }`}
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`absolute top-4 left-4 flex items-center ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          <FaArrowLeft size={24} />
          <span className="ml-2">Back</span>
        </button>

        {/* User Profile Section */}
        <div className="relative flex items-center mt-16">
          <img
            src={userInfo?.profile_image}
            alt="avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-800"
          />
          <div className="ml-4">
            <h1
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {userInfo?.fullName || "Your Name"}
            </h1>
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              @{userInfo?.username || "your_username"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2
            className={`text-lg font-bold mt-8 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Create Blog
          </h2>
          <div className="flex-grow ml-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Visibility:
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                theme === "dark"
                  ? "bg-zinc-700 text-white border-zinc-600"
                  : "bg-white text-black border-zinc-800"
              }`}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              htmlFor="title"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Title*"
              className={`w-full p-2 border rounded-md ${
                theme === "dark"
                  ? "bg-zinc-700 text-white border-zinc-600"
                  : "bg-white text-black border-gray-400"
              }`}
            />
          </div>
          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            htmlFor="description"
          >
            Description:
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="mb-6"
            placeholder="What's on your mind?"
            style={{ height: "12rem" }}
          />
          <hr
            className={`my-12 ${
              theme === "dark" ? "border-gray-600" : "border-gray-300"
            }`}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                    className="object-cover w-full h-full"
                  />
                ) : file.type === "application/pdf" ? (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-600">
                    <FaFilePdf size={40} />
                    <p className="text-xs">PDF</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-600">
                    <p className="text-xs">Unsupported File</p>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            multiple
            accept=".jpg, .jpeg, .png, .pdf"
          />

          <button
            type="button"
            onClick={handleFileClick}
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {selectedFiles.length < 4 ? "Add File" : "Max Files Reached"}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="w-full p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
