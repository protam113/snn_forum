import React from "react";
import FAQ from "./components/FAQ";
import CreateBy from "./components/CreateBy";
import Service from "./components/Service";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Setting = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Khu vực phần trên */}
      <h1 className="text-18 font-bold text-gray-800 mb-4">Setting Page</h1>
      <p className="text-gray-600">
        Here you can customize your settings and preferences.
      </p>

      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4">
          Điều khoản dịch vụ
        </h2>
        <Service />
      </div>
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4">
          Chính sách riêng tư
        </h2>
        <PrivacyPolicy />
      </div>

      {/* Phần FAQ ở dưới cùng */}
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </div>
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4">About US</h2>
        <CreateBy />
      </div>
    </div>
  );
};

export default Setting;
