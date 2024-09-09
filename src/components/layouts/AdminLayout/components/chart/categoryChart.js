import React from "react";
import { useCategoryList } from "../../../../../hooks/Product/useCategories";

export default function CategoryChart() {
  const { data: categories, isLoading, error } = useCategoryList();

  // Fallback value when categories is undefined
  const totalCategories = categories ? categories.length : 0;

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );
  }

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
