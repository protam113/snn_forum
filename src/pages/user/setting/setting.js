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
  FaPhoneAlt,
  FaMailBulk,
  FaMap,
  FaLink,
} from "react-icons/fa";
import { useWeb } from "../../../hooks/useWeb";
import Loading from "../../error/load";

const Setting = () => {
  const { data: web, error, isLoading } = useWeb();
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Khu vực phần trên */}
      <h1 className="text-18 font-bold text-gray-800 mb-4">Cài Đặt</h1>
      <p className="text-gray-600">
        Quản lý phần cài đặt tài khoản và trải nghiệm kết nối trên các công nghệ
        của chúng tôi!
      </p>

      <div className="shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <IoSettingsOutline className="mr-2 text-gray-500" />
          Cài đặt & quyền riêng tư
        </h2>
        <ChangePassword />
      </div>

      {web && (
        <div className="shadow-lg p-6 border-t border-gray-300 bg-white rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FaServicestack className="mr-3 text-primary" />
            Thông tin về chúng tôi
          </h2>
          <div className="rounded-lg shadow p-6 bg-gray-50 max-w-lg mx-auto">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={web.img}
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {web.about}
                </h3>
                <p className="text-gray-600 text-sm flex items-center">
                  <FaPhoneAlt className="w-4 h-4 mr-2 text-primary" />
                  {web.phone_number}
                </p>
                <p className="text-gray-600 text-sm flex items-center mt-1">
                  <FaMailBulk className="w-4 h-4 mr-2 text-primary" />
                  {web.mail}
                </p>
                <p className="text-gray-600 text-sm flex items-center mt-1">
                  <FaMap className="w-4 h-4 mr-2 text-primary" />
                  {web.location}
                </p>
                <a
                  href={web.link}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <FaLink className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaServicestack className="mr-2 text-gray-500" />
          Điều khoản dịch vụ
        </h2>
        <Service />
      </div>

      <div className="shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaShieldAlt className="mr-2 text-gray-500" />
          Chính sách riêng tư
        </h2>
        <PrivacyPolicy />
      </div>

      {/* Phần FAQ ở dưới cùng */}
      <div className="shadow-md p-4 border-t border-gray-200">
        <h2 className="text-18 font-semibold text-gray-800 mb-4 flex items-center">
          <FaQuestionCircle className="mr-2 text-gray-500" />
          F&Q
        </h2>
        <FAQ />
      </div>

      <div className="shadow-md p-4 border-t border-gray-200">
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
