import React from "react";
import useCategories from "../../../../../hooks/useCategories";

export default function CategoryChart() {
  const { categories } = useCategories(); // Hook to get categories

  // Calculate the total number of categories
  const totalCategories = categories.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-semibold text-lg">Total Categories</div>
      <div className="text-sm text-gray-600">
        The total number of categories in the system.
      </div>
      <div className="text-4xl font-bold">{totalCategories}</div>
    </div>
  );
}
