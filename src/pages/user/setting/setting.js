import React from "react";
import FAQ from "./components/FAQ";
import CreateBy from "./components/CreateBy";

const Setting = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Khu vực phần trên */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Setting Page</h1>
        <p className="text-gray-600">
          Here you can customize your settings and preferences.
        </p>
        {/* Bạn có thể thêm các thành phần khác vào đây sau này */}
      </div>

      {/* Phần FAQ ở dưới cùng */}
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </div>
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About US</h2>
        <CreateBy />
      </div>
    </div>
  );
};

export default Setting;
