import React from "react";
import { useUserTag } from "../../../../hooks/Product/useUserTag";

const TagsList = ({ selectedTags, onTagChange }) => {
  const { data: tags, isLoading, isError } = useUserTag();

  const handleCheckboxChange = (id) => {
    const newSelectedTags = selectedTags.includes(id)
      ? selectedTags.filter((tagId) => tagId !== id)
      : [...selectedTags, id];

    onTagChange(newSelectedTags);
  };

  if (isLoading) return <p className="text-gray-500">Loading tags...</p>;
  if (isError) return <p className="text-red-500">Error loading tags</p>;

  return (
    <div className="grid grid-cols-2 gap-2">
      {tags?.map((tag) => (
        <div
          key={tag.id}
          className="flex items-center space-x-2 p-1 border rounded-md  shadow-sm "
        >
          <input
            type="checkbox"
            id={`tag-${tag.id}`}
            checked={selectedTags.includes(tag.id)}
            onChange={() => handleCheckboxChange(tag.id)}
            className="form-checkbox h-4 w-4 text-blue-500 rounded"
          />
          <label
            htmlFor={`tag-${tag.id}`}
            className="text-sm text-gray-700 leading-tight"
          >
            {tag.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TagsList;
