import React, { useState } from "react";
import { useDeleteTag, useEditTag, useTags } from "../../../hooks/useTag";
import Loading from "../../error/load";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useAddTag } from "../../../hooks/useTag";
import EditTagPopup from "./EditTagPopup";
import AddTagPopup from "./AddTagPopup";

const ManageTag = () => {
  const { data: tags, error, isLoading } = useTags();
  const { mutate: addTagMutation } = useAddTag();
  const { mutate: editTagMutation } = useEditTag();
  const { mutate: deleteTagMutation } = useDeleteTag();

  const [editingTag, setEditingTag] = useState(null);
  const [showAddTagPopup, setShowAddTagPopup] = useState(false);

  const handleAddTag = (newTag) => {
    return addTagMutation(
      { name: newTag },
      {
        onSuccess: () => {
          setShowAddTagPopup(false);
        },
      }
    );
  };

  const handleEditTag = (updatedTag) => {
    return editTagMutation(
      { TagId: updatedTag.id, edtTag: updatedTag },
      {
        onSuccess: () => {
          setEditingTag(null);
        },
      }
    );
  };

  const handleDeleteTag = (tagId) => {
    return deleteTagMutation(
      { TagId: tagId },
      {
        onSuccess: () => {},
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        <span> Quản lý Tag</span>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded flex items-center text-sm"
          onClick={() => setShowAddTagPopup(true)}
        >
          <FaPlus className="mr-2 text-lg" />
          <span className="hidden md:inline">Add Tag</span>
        </button>
      </h1>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags?.length > 0 ? (
            tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{tag.id}</td>
                <td className="py-2 px-4 border-b">{tag.name}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => setEditingTag(tag)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center text-gray-500">
                No tags available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingTag && (
        <EditTagPopup
          tag={editingTag}
          onClose={() => setEditingTag(null)}
          onSave={handleEditTag}
        />
      )}

      {showAddTagPopup && (
        <AddTagPopup
          onClose={() => setShowAddTagPopup(false)}
          onSave={handleAddTag}
        />
      )}
    </div>
  );
};

export default ManageTag;
