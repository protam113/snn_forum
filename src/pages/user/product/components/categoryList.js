import React from "react";
import { useUserCategoryList } from "../../../../hooks/Product/useUserCategory";

const CategoryList = ({ selectedCategories, onCategoryChange }) => {
  const { data: categories, isLoading, isError } = useUserCategoryList();

  const handleCheckboxChange = (id) => {
    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];

    onCategoryChange(newSelectedCategories);
  };

  if (isLoading) return <p className="text-gray-500">Loading categories...</p>;
  if (isError) return <p className="text-red-500">Error loading categories</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories?.map((category) => (
        <div
          key={category.id}
          className="flex items-center space-x-2 p-2 border rounded-md bg-white shadow-sm hover:bg-gray-100"
        >
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCheckboxChange(category.id)}
            className="form-checkbox text-blue-500 rounded"
          />
          <label
            htmlFor={`category-${category.id}`}
            className="text-sm text-gray-700"
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
