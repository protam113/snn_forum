import React from "react";
import JobApplicationGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StatisticalJobApplicationGeneral";

const StatisticalJobApplicationGeneral = () => {
  return (
    <div className="p-4">
      <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
        <div className="font-semibold text-lg mb-2">Thống Kê Sản Phẩm.</div>
        <JobApplicationGeneral />
      </div>
    </div>
  );
};

export default StatisticalJobApplicationGeneral;
