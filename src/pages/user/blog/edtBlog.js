import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../error/load";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { useTheme } from "../../../context/themeContext";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";
import Toolbar from "../../../components/design/Toolbar";
import { useBlogDetail, useEditBlog } from "../../../hooks/Blog/useBlog";

const EdtBlog = () => {
  const { theme } = useTheme();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { mutate: editBlog } = useEditBlog(blogId);
  const {
    data: blog,
    isLoading: blogLoading,
    isError: blogError,
  } = useBlogDetail(blogId);
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
      const turndownService = new TurndownService();
      const descriptionMarkdown = turndownService.turndown(
        blog.description || ""
      );

      setFormData({
        content: blog.content || "",
        description: descriptionMarkdown,
        visibility: blog.visibility || "public",
        file_type: blog.file_type || "image",
        media: blog.media || [],
        id_media_remove: [],
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

  const handleInsert = (text) => {
    setFormData((prev) => ({
      ...prev,
      description: prev.description + text,
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
    selectedFiles.forEach((file) => {
      if (file instanceof File) {
        data.append("media", file);
      }
    });
    Object.keys(formData).forEach((key) => {
      if (key !== "media") {
        data.append(key, formData[key]);
      }
    });

    try {
      const htmlDescription = marked(formData.description);
      data.append("description", htmlDescription);

      await editBlog({ edtBlog: data });
      navigate(`/blog/${blogId}`);
    } catch (err) {
      console.error("Failed to update blog", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (blogLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (blogError) return <p className="text-center text-red-500">{blogError}</p>;

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit}>
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
        <Toolbar onInsert={handleInsert} />

        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className={`mb-6 ${
              theme === "dark"
                ? "text-white bg-gray-800"
                : "text-black bg-white"
            }`}
            placeholder="What's on your mind?"
            rows={4}
            style={{ width: "100%" }}
          />
          <div className="mt-4">
            <ReactMarkdown>{formData.description}</ReactMarkdown>
          </div>
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
                <FaFilePdf className="w-full h-full text-gray-600" />
              ) : null}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleFileClick}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Upload Files
        </button>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`w-full p-2 bg-blue-500 text-white rounded ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EdtBlog;
