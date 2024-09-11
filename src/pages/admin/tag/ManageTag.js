import React, { useState } from "react";
import {
  useDeleteTag,
  useEditTag,
  useTags,
  useAddTag,
} from "../../../hooks/useTag";
import Loading from "../../error/load";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EditTagPopup from "./EditTagPopup";
import AddTagPopup from "./AddTagPopup";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ManageTag = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useTags(page);
  const { mutate: addTagMutation } = useAddTag();
  const { mutate: editTagMutation } = useEditTag();
  const { mutate: deleteTagMutation } = useDeleteTag();

  const [editingTag, setEditingTag] = useState(null);
  const [showAddTagPopup, setShowAddTagPopup] = useState(false);

  const handleAddTag = (newTag) => {
    addTagMutation(
      { name: newTag },
      {
        onSuccess: () => setShowAddTagPopup(false),
      }
    );
  };

  const handleEditTag = (updatedTag) => {
    editTagMutation(
      { TagId: updatedTag.id, edtTag: updatedTag },
      {
        onSuccess: () => setEditingTag(null),
      }
    );
  };

  const handleDeleteTag = (tagId) => {
    deleteTagMutation({ TagId: tagId });
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
    <div className="container mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Tag</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors duration-300"
          onClick={() => setShowAddTagPopup(true)}
        >
          <FaPlus className="mr-2 text-lg" />
          <span>Thêm Tag</span>
        </button>
      </div>

      <table className="w-full bg-white border border-gray-500 rounded-lg overflow-hidden shadow-sm text-16 font-semibold">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-4 px-6 border-b text-center text-gray-700">ID</th>
            <th className="py-4 px-6 border-b text-center text-gray-700">
              Tên Tag
            </th>
            <th className="py-4 px-6 border-b text-center text-gray-700">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {data.tags.length > 0 ? (
            data.tags.map((tag, index) => (
              <tr
                key={tag.id}
                className="hover:bg-gray-50 transition-colors duration-200 text-14"
              >
                {/* Hiển thị thứ tự của tag thay vì ID */}
                <td className="py-4 px-6 border-b text-center ">
                  {index + 1 + (page - 1) * 20}
                </td>
                <td className="py-4 px-6 border-b text-center">{tag.name}</td>
                <td className="py-4 px-6 border-b text-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-4"
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
              <td
                colSpan="3"
                className="py-4 px-6 text-center text-gray-500 text-14"
              >
                Không có tag nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mr-2"
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button
          onClick={() =>
            setPage((prev) => (prev < data.totalPages ? prev + 1 : prev))
          }
          disabled={page === data.totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>

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
