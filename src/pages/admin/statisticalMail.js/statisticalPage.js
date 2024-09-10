import React from "react";
import StaticalBlogGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalBlogGeneral";
// import StaticalProductGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalProductGeneral";
// import StaticalProductCategoryGeneral from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalProductCategoryGeneral";
// import StaticalProductCategorySpecific from "../../../components/layouts/AdminLayout/components/chart/statistical/StaticalProductCategorySpecific";

const StatisticalPage = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
          <div className="font-semibold text-lg mb-2">
            Thống Kê Bài Viết Ở Các Quý
          </div>
          <div className="text-sm text-gray-600 mb-4">Thống kê blog .</div>
          <StaticalBlogGeneral />
        </div>

        {/* <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
          <div className="font-semibold text-lg mb-2">
            Thống Kê Sản Phẩm Ở Các Quý
          </div>
          <div className="text-sm text-gray-600 mb-4">Thống kê sản phẩm .</div>
          <StaticalProductGeneral />
        </div> */}

        {/* <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
          <div className="font-semibold text-lg mb-2">
            Thống Kê Sản Phẩm Theo Thể Loại
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Thống kê sản phẩm và thể loại(category).
          </div>
          <StaticalProductCategoryGeneral />
        </div>
        <div className="shadow-md rounded-lg p-4 bg-white border border-gray-200">
          <div className="font-semibold text-lg mb-2">
            Thống Kê Sản Phẩm Theo Thể Loại
          </div>
          <div className="text-sm text-gray-600 mb-4">
            Thống kê sản phẩm và thể loại(category).
          </div>
          <StaticalProductCategorySpecific />
        </div> */}
      </div>
    </div>
  );
};

export default StatisticalPage;
