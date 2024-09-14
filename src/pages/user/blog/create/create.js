import React, { useRef, useState } from "react";
import {
  FaTrashAlt,
  FaArrowLeft,
  FaFilePdf,
  FaFileUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";
import useUserInfo from "../../../../hooks/useUserInfo";
import { MdPerson } from "react-icons/md";
import Toolbar from "../../../../components/design/Toolbar";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import { useAddBlog } from "../../../../hooks/Blog/useBlogs";
import { AiOutlineWarning } from "react-icons/ai";

const Create = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [fileType, setFileType] = useState("image");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const { mutate: addBlogMutation } = useAddBlog();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    formData.append("visibility", visibility);
    formData.append("description", marked(description));
    formData.append("fileType", fileType);

    selectedFiles.forEach((file) => {
      formData.append("media", file); // Sử dụng 'media' thay vì 'files'
    });

    console.log("FormData:", [...formData.entries()]); // Debugging line

    setLoading(true);
    try {
      await addBlogMutation(formData, {
        onSuccess: () => {
          navigate(-1);
        },
        onError: (error) => {
          console.error("Error submitting blog:", error);
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsert = (text) => {
    setDescription((prev) => prev + text);
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
          {userInfo?.profile_image ? (
            <img
              src={userInfo.profile_image}
              alt="avatar"
              className={`size-12 rounded-full ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            />
          ) : (
            <MdPerson
              className={`size-12 rounded-full ${
                theme === "dark" ? "text-white" : "text-gray-500"
              }`}
            />
          )}
          <div className="ml-4">
            <h1
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {userInfo?.first_name || "Your"} {userInfo?.last_name || "Name"}
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

        {/* Visibility Selector */}
        <div className="mb-4">
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
        </div>

        <div className="flex flex-col lg:flex-row mt-8">
          {/* Left Column - File Upload Section */}
          <div className="w-full lg:w-1/3 pr-0 lg:pr-4 mb-8 lg:mb-0">
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
            <div className="mb-4 p-4 text-14 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center">
              <AiOutlineWarning size={24} className="mr-2 text-red-600" />
              <span>Hãy chắc chắn rằng mỗi hình ảnh không vượt quá 5MB.</span>
            </div>
            {/* File Upload Section */}
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

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className={`block mb-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                htmlFor="title"
              >
                Tiêu Đề:
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
            <Toolbar onInsert={handleInsert} />

            <div className="mb-4">
              <label
                className={`block mb-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                htmlFor="content"
              >
                Nội Dung:
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                rows={5}
                className={`w-full p-2 border rounded-md ${
                  theme === "dark"
                    ? "bg-zinc-700 text-white border-zinc-600"
                    : "bg-white text-black border-zinc-800"
                }`}
              />

              <div className="mt-4 white-space-pre">
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`mt-4 px-6 py-2 font-semibold text-lg rounded-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
