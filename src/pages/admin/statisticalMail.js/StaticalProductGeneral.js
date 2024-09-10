import React from "react";
import StaticalProductGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalProductCategoryGeneral";

const StaticalProduct = () => {
  return (
    <div className="p-4">
      <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
        <div className="font-semibold text-lg mb-2">Thống Kê Sản Phẩm.</div>
        <StaticalProductGeneral />
      </div>
    </div>
  );
};

export default StaticalProduct;
