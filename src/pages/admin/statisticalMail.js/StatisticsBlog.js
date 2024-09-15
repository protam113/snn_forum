import React from "react";
import StaticalBlogGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalBlogGeneral";

const StatisticalBlogs = () => {
  return (
    <div className="p-4">
      <div className="shadow-md rounded-lg p-4  border border-gray-200">
        <div className="font-semibold text-lg mb-2">Thống Kê Bài Viết.</div>
        <div className="text-sm text-gray-600 mb-4">Thống kê blog .</div>
        <StaticalBlogGeneral />
      </div>
    </div>
  );
};

export default StatisticalBlogs;
