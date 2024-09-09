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
import { useTheme } from "../../../context/themeContext";

const Setting = () => {
  const { data: web, error, isLoading } = useWeb();
  const { theme } = useTheme();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full h-screen flex flex-col ">
      {/* Khu vực phần trên */}
      <h1
        className={`text-18 font-bold mb-4 ${
          theme === "dark" ? "text-gray-300" : "text-black"
        }`}
      >
        Cài Đặt
      </h1>
      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        Quản lý phần cài đặt tài khoản và trải nghiệm kết nối trên các công nghệ
        của chúng tôi!
      </p>

      <div
        className={`shadow-md p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-18 font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <IoSettingsOutline
            className={`mr-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          />
          Cài đặt & quyền riêng tư
        </h2>
        <ChangePassword />
      </div>

      {web && (
        <div
          className={`shadow-lg p-6 border-t rounded-lg ${
            theme === "dark" ? "border-gray-700 " : "border-gray-300"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 flex items-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <FaServicestack
              className={`mr-3 ${
                theme === "dark" ? "text-primary" : "text-primary"
              }`}
            />
            Thông tin về chúng tôi
          </h2>
          <div className={`rounded-lg shadow p-6 max-w-lg mx-auto`}>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={web.img}
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {web.about}
                </h3>
                <p
                  className={`text-sm flex items-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaPhoneAlt
                    className={`w-4 h-4 mr-2 ${
                      theme === "dark" ? "text-primary" : "text-primary"
                    }`}
                  />
                  {web.phone_number}
                </p>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaMailBulk
                    className={`w-4 h-4 mr-2 ${
                      theme === "dark" ? "text-primary" : "text-primary"
                    }`}
                  />
                  {web.mail}
                </p>
                <p
                  className={`text-sm flex items-center mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <FaMap
                    className={`w-4 h-4 mr-2 ${
                      theme === "dark" ? "text-primary" : "text-primary"
                    }`}
                  />
                  {web.location}
                </p>
                <a
                  href={web.link}
                  className={`mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline ${
                    theme === "dark" ? "text-primary" : "text-primary"
                  }`}
                >
                  <FaLink className="w-4 h-4" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`shadow-md p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-18 font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <FaServicestack
            className={`mr-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          />
          Điều khoản dịch vụ
        </h2>
        <Service />
      </div>

      <div
        className={`shadow-md p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-18 font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <FaShieldAlt
            className={`mr-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          />
          Chính sách riêng tư
        </h2>
        <PrivacyPolicy />
      </div>

      {/* Phần FAQ ở dưới cùng */}
      <div
        className={`shadow-md p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-18 font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <FaQuestionCircle
            className={`mr-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          />
          F&Q
        </h2>
        <FAQ />
      </div>

      <div
        className={`shadow-md p-4 border-t ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-18 font-semibold mb-4 flex items-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          <FaUserTie
            className={`mr-2 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          />
          About US
        </h2>
        <CreateBy />
      </div>
    </div>
  );
};

export default Setting;
