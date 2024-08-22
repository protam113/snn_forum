import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCategories from "../../../hooks/useCategories";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const { addCategory, loading, error } = useCategories();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name) {
      try {
        await addCategory({ name });
        navigate(-1);
      } catch (err) {}
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Category Name:
          </label>
          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCategory;
