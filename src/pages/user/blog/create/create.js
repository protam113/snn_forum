import React, { useRef, useReducer } from "react";
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

const SET_CONTENT = "SET_CONTENT";
const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_VISIBILITY = "SET_VISIBILITY";
const SET_FILE_TYPE = "SET_FILE_TYPE";
const SET_SELECTED_FILES = "SET_SELECTED_FILES";
const SET_LOADING = "SET_LOADING";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_VISIBILITY:
      return { ...state, visibility: action.payload };
    case SET_FILE_TYPE:
      return { ...state, fileType: action.payload };
    case SET_SELECTED_FILES:
      return { ...state, selectedFiles: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  content: "",
  description: "",
  visibility: "public",
  fileType: "image",
  selectedFiles: [],
  loading: false,
};

const Create = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { mutate: addBlogMutation } = useAddBlog();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let newFiles = [];
    let totalImages = state.selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    ).length;
    let totalPdfs = state.selectedFiles.filter(
      (file) => file.type === "application/pdf"
    ).length;

    files.forEach((file) => {
      if (state.fileType === "image" && file.type.startsWith("image/")) {
        if (totalImages < 4) {
          newFiles.push(file);
          totalImages++;
        } else {
          alert("You can only upload up to 4 images.");
        }
      } else if (state.fileType === "pdf" && file.type === "application/pdf") {
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
      dispatch({
        type: SET_SELECTED_FILES,
        payload: [...state.selectedFiles, ...newFiles],
      });
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = (index) => {
    dispatch({
      type: SET_SELECTED_FILES,
      payload: state.selectedFiles.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!state.content.trim()) {
      alert("Vui lòng nhập tiêu đề.");
      return;
    }

    const formData = new FormData();
    formData.append("content", state.content);
    formData.append("visibility", state.visibility);
    formData.append("description", marked(state.description));
    formData.append("fileType", state.fileType);

    state.selectedFiles.forEach((file) => {
      formData.append("media", file);
    });

    console.log("FormData:", [...formData.entries()]);

    dispatch({ type: SET_LOADING, payload: true });
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
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  const handleInsert = (text) => {
    dispatch({ type: SET_DESCRIPTION, payload: state.description + text });
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
              className={`w-12 h-12 rounded-full ${
                theme === "dark" ? "border-white" : "border-black"
              }`}
            />
          ) : (
            <MdPerson
              className={`w-12 h-12 rounded-full ${
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
            value={state.visibility}
            onChange={(e) =>
              dispatch({ type: SET_VISIBILITY, payload: e.target.value })
            }
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
        <div className="mb-4 p-4 text-14 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center">
          <AiOutlineWarning size={24} className="mr-2 text-red-600" />
          <span>Hãy chắc chắn rằng mỗi hình ảnh không vượt quá 5MB.</span>
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
                value={state.fileType}
                onChange={(e) =>
                  dispatch({ type: SET_FILE_TYPE, payload: e.target.value })
                }
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

            {/* File Upload Section */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              {state.selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden"
                  style={{ width: "100%", height: "100px" }}
                >
                  <div
                    className={`absolute top-0 right-0 p-2 cursor-pointer ${
                      theme === "dark"
                        ? "text-red-500 hover:text-red-300"
                        : "text-red-700 hover:text-red-500"
                    }`}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <FaTrashAlt />
                  </div>
                  <div
                    className="flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md"
                    style={{ height: "100%", overflow: "hidden" }}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaFilePdf size={48} className="text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleFileClick}
              className="w-full py-2 bg-blue-500 text-white rounded-md flex items-center justify-center"
            >
              <FaFileUpload className="mr-2" />
              <span>Upload Files</span>
            </button>
          </div>

          {/* Right Column - Content Section */}
          <div className="w-full lg:w-2/3 pl-0 lg:pl-4">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Tiêu Đề:
                </label>
                <input
                  type="text"
                  value={state.content}
                  onChange={(e) =>
                    dispatch({ type: SET_CONTENT, payload: e.target.value })
                  }
                  className={`w-full p-2 border rounded-md ${
                    theme === "dark"
                      ? "bg-zinc-700 text-white border-zinc-600"
                      : "bg-white text-black border-zinc-800"
                  }`}
                />
              </div>
              <div
                className={`relative max-w-6xl w-full p-6 border rounded-md shadow-lg ${
                  theme === "dark"
                    ? "border-zinc-800 text-white"
                    : "border-white text-black"
                }`}
              >
                {/* Toolbar */}
                <Toolbar onInsert={handleInsert} />

                {/* Description */}
                <div className="mb-4">
                  <label
                    className={`block mb-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                    htmlFor="description"
                  >
                    Nội Dung:
                  </label>
                  <textarea
                    value={state.description}
                    // onChange={(e) => setDescription(e.target.value)}
                    onChange={(e) =>
                      dispatch({
                        type: SET_DESCRIPTION,
                        payload: e.target.value,
                      })
                    }
                    rows={5}
                    className={`w-full p-2 border rounded-md ${
                      theme === "dark"
                        ? "bg-zinc-700 text-white border-zinc-600"
                        : "bg-white text-black border-zinc-800"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  className={`py-2 px-4 rounded-md ${
                    state.loading
                      ? "bg-gray-400 text-gray-200"
                      : theme === "dark"
                      ? "bg-blue-500 text-white hover:bg-blue-400"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                  disabled={state.loading}
                >
                  {state.loading ? "Đang gửi..." : "Gửi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
