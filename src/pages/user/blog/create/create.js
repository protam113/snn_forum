import React, { useState, useRef } from "react";
import {
  FaTrashAlt,
  FaArrowLeft,
  FaFilePdf,
  FaFileUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const [fileType, setFileType] = useState("image"); // Thêm trạng thái fileType
  const navigate = useNavigate();
  const { handleSubmitBlog, submitting, fileInputRef } = useBlog();
  const { userInfo } = useUserInfo();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let newFiles = [];
    let totalImages = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    ).length;
    let totalPdfs = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    ).length;

    files.forEach((file) => {
      if (fileType === "image" && file.type.startsWith("image/")) {
        if (totalImages < 4) {
          newFiles.push(file);
          totalImages++;
        } else {
          alert("You can only upload up to 4 images.");
        }
      } else if (fileType === "pdf" && file.type === "application/pdf") {
        if (totalPdfs < 1) {
          newFiles.push(file);
          totalPdfs++;
        } else {
          alert("You can only upload 1 PDF file.");
        }
      } else {
        alert("Unsupported file type.");
      }
    });

    if (newFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    handleSubmitBlog(
      event,
      content,
      description,
      visibility,
      selectedFiles, // Pass selectedFiles to the submit function
      fileType, // Pass fileType to the submit function
      () => {
        navigate(-1);
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
            ? "border-zinc-800 text-white"
            : "border-white text-black"
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
              {userInfo?.first_name || "Your "} {userInfo?.last_name || " Name"}
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
        <hr className="mt-4" />
        <label
          className={`block mb-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Trạng Thái:
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
        </select>

        <div className="flex mt-8">
          {/* File Type Selector */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              File Type:
            </label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className={`w-full p-2 border rounded-md ${
                theme === "dark"
                  ? "bg-zinc-700 text-white border-zinc-600"
                  : "bg-white text-black border-zinc-800"
              }`}
            >
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          {/* Image/File Upload Section (Left Column) */}
          <div className="w-1/3 pr-4">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden"
                  style={{ width: "100%", height: "100px" }}
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
            <div
              onClick={handleFileClick}
              className="mt-1 flex justify-center items-center cursor-pointer rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
            >
              <div className="space-y-1 text-center">
                <FaFileUpload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">Nhấp để thêm tệp!</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              multiple
              accept=".jpg, .jpeg, .png, .pdf"
            />
          </div>

          {/* Content Section (Right Column) */}
          <div className="w-2/3 pl-4">
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
                      : "bg-white text-black border-zinc-800"
                  }`}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Description:
                </label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  placeholder="Write a description..."
                />
              </div>
              <button
                type="submit"
                className={`w-full p-2 rounded-md ${
                  theme === "dark"
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
