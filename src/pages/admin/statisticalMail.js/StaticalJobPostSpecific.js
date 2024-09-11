import React from "react";
import StaticalJobPostSpecificChart from "../../../components/layouts/AdminLayout/components/chart/statistical/StatucalJobPostSpecificChart";

const StaticalJobPostSpecific = () => {
  return (
    <div className="p-4">
      <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
        <div className="font-semibold text-lg mb-2">
          Thống Kê Các Tin Tuyển Dụng Theo Tiêu Chí.
        </div>
        <StaticalJobPostSpecificChart />
      </div>
    </div>
  );
};

export default StaticalJobPostSpecific;
