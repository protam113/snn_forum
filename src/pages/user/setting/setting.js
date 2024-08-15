import React from "react";
import FAQ from "./components/FAQ";
import CreateBy from "./components/CreateBy";
import Service from "./components/Service";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ChangePassword from "./components/ChangePassword";
import { IoSettingsOutline } from "react-icons/io5";
import {
  FaServicestack,
  FaShieldAlt,
  FaQuestionCircle,
  FaUserTie,
} from "react-icons/fa";

const Setting = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Khu vực phần trên */}
      <h1 className="text-18 font-bold text-gray-800 mb-4">Cài Đặt</h1>
      <p className="text-gray-600">
        Quản lý phần cài đặt tài khoản và trải nghiệm kết nối trên các công nghệ
        của chúng tôi!
      </p>

      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <IoSettingsOutline className="mr-2 text-gray-500" />
          Cài đặt & quyền riêng tư
        </h2>
        <ChangePassword />
      </div>

      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaServicestack className="mr-2 text-gray-500" />
          Điều khoản dịch vụ
        </h2>
        <Service />
      </div>

      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaShieldAlt className="mr-2 text-gray-500" />
          Chính sách riêng tư
        </h2>
        <PrivacyPolicy />
      </div>

      {/* Phần FAQ ở dưới cùng */}
      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaQuestionCircle className="mr-2 text-gray-500" />
          F&Q
        </h2>
        <FAQ />
      </div>

      <div className="bg-white shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaUserTie className="mr-2 text-gray-500" />
          About US
        </h2>
        <CreateBy />
      </div>
    </div>
  );
};

export default Setting;
