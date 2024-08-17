import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useBanner from "../../../hooks/useBanner";

const CreateBanner = () => {
  const { addBanner, loading, error } = useBanner();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("show");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setPreviewImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("status", status);
    formData.append("description", description);

    try {
      await addBanner(formData);
      // Clear form fields after successful submission
      setTitle("");
      setImage(null);
      setPreviewImage("");
      setStatus("show");
      setDescription("");

      // Navigate back to the previous page
      navigate("/admin/banners");
    } catch (err) {
      // Handle errors if needed
      console.error("Error adding banner:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Banner</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex-1 relative mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Image
          </label>
          <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {previewImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-200"
                >
                  <AiOutlineDelete size={20} className="text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <AiOutlinePlus size={24} />
                <span>Choose an image</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="show">Show</option>
            <option value="hide">Hide</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`inline-flex items-center justify-center text-white rounded-md bg-custom-red px-6 py-3 text-14 font-medium transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBanner;
