import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useBlog from "../../../hooks/useBlog";
import Loading from "../../error/load";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { useTheme } from "../../../context/themeContext";

const EdtBlog = () => {
  const { theme } = useTheme();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { blog, loading, error, editBlog } = useBlog(blogId);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    content: "",
    description: "",
    visibility: "public",
    file_type: "image",
    media: [],
    id_media_remove: [],
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        content: blog.content || "",
        description: blog.description || "",
        visibility: blog.visibility || "public",
        file_type: blog.file_type || "image",
        media: blog.media || [],
        id_media_remove: [], // Khởi tạo danh sách id_media_remove rỗng
      });
      setSelectedFiles(blog.media || []);
    }
  }, [blog]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length <= 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can only upload up to 4 files.");
    }
  };

  const handleRemoveFile = (index) => {
    const fileToRemove = selectedFiles[index];
    if (fileToRemove.id) {
      // Nếu là file cũ (đã có ID), thêm ID vào id_media_remove
      setFormData((prevData) => ({
        ...prevData,
        id_media_remove: [...prevData.id_media_remove, fileToRemove.id],
      }));
    }
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    // Thêm các tệp mới vào formData
    selectedFiles.forEach((file) => {
      if (file instanceof File) {
        data.append("media", file);
      }
    });
    // Thêm các trường còn lại vào formData
    Object.keys(formData).forEach((key) => {
      if (key !== "media") {
        data.append(key, formData[key]);
      }
    });

    try {
      await editBlog(data);
      toast.success("Blog updated successfully!");
      navigate(`/blog/${blogId}`);
    } catch (err) {
      console.error("Failed to update blog", err);
      toast.error("Failed to update blog.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        {/* Form content */}
        <div className="mb-4">
          <label
            htmlFor="content"
            className={`block ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Content
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className={`w-full p-2 border border-gray-300 rounded ${
              theme === "dark" ? "text-black" : "text-gray-700"
            }`}
            rows="2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Description
          </label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className={`mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}
            placeholder="What's on your mind?"
            style={{ height: "12rem" }}
          />
        </div>
        <hr className="my-6" />
        <div className="mb-4">
          <label
            htmlFor="visibility"
            className={`block ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Visibility
          </label>
          <select
            id="visibility"
            value={formData.visibility}
            onChange={(e) =>
              setFormData({ ...formData, visibility: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className={`block mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            File Type:
          </label>
          <select
            value={formData.file_type}
            onChange={(e) =>
              setFormData({ ...formData, file_type: e.target.value })
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
        <div className="grid grid-cols-2 gap-4 mb-4">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="relative overflow-hidden"
              style={{ width: "100px", height: "100px" }}
            >
              {file?.type?.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${index}`}
                  className="object-cover w-full h-full"
                />
              ) : file?.type === "application/pdf" ? (
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
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".jpg, .jpeg, .png, .pdf"
        />

        <button
          type="button"
          onClick={handleFileClick}
          className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {selectedFiles.length > 0 ? "Change Files" : "Add Files"}
        </button>

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EdtBlog;
