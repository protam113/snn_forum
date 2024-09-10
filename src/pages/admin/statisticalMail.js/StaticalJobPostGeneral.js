import React from "react";
import StaticalJobPostGeneralChart from "../../../components/layouts/AdminLayout/components/chart/statistical/staticalJobPostGeneral";

const StaticalJobPostGeneral = () => {
  return (
    <div className="p-4">
      <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
        <div className="font-semibold text-lg mb-2">
          Thống Kê Các Tin Tuyển Dụng Theo Tiêu Chí.
        </div>
        <StaticalJobPostGeneralChart />
      </div>
    </div>
  );
};

export default StaticalJobPostGeneral;
