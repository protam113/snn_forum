import React from "react";
import { useUserCategoryList } from "../../../../../hooks/Product/useUserCategory";

export default function CategoryChart() {
  const { data: categories, isLoading, isError } = useUserCategoryList();

  // Fallback value when categories is undefined
  const totalCategories = categories ? categories.length : 0;

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );
  }

  return (
    <div className=" rounded-lg p-4 text-white">
      <div className="font-semibold text-lg">Total Categories</div>
      <div className="text-sm text-gray-800">Categories có trong hệ thống.</div>
      <div className="text-4xl font-bold">{totalCategories}</div>
    </div>
  );
}
