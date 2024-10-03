import React, { useState } from "react";
import FAQ from "./components/FAQ";
import CreateBy from "./components/CreateBy";
import Service from "./components/Service";
import PrivacyPolicy from "./components/PrivacyPolicy";
import {
  FaServicestack,
  FaShieldAlt,
  FaQuestionCircle,
  FaUserTie,
} from "react-icons/fa";
import { useWeb } from "../../../hooks/useWeb";
import Loading from "../../error/load";
import { useTheme } from "../../../context/themeContext";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { Block } from "../../../components/layouts/AdminLayout/components/RevealBento";
import { IoSettingsOutline } from "react-icons/io5";
import ChangePassword from "./components/ChangePassword";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { data: web, error, isLoading } = useWeb();
  const { theme } = useTheme();

  // Loading và Error handling
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  // Hàm render nội dung component con dựa trên tab đang chọn
  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountComponent web={web} theme={theme} />;
      case "privacy":
        return <PrivacyPolicyComponent theme={theme} />;
      case "about":
        return <AboutTeamComponent theme={theme} />;
      default:
        return <AccountComponent web={web} theme={theme} />;
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Thanh điều hướng tabs */}
      <div className="flex justify-center bg-white shadow-lg rounded-lg p-4 mb-4">
        {renderTabButton(
          "account",
          "Account",
          activeTab,
          setActiveTab,
          <FaUserTie />
        )}
        {renderTabButton(
          "privacy",
          "Privacy Policy",
          activeTab,
          setActiveTab,
          <FaShieldAlt />
        )}
        {renderTabButton(
          "about",
          "About Team",
          activeTab,
          setActiveTab,
          <FaQuestionCircle />
        )}
      </div>

      {/* Nội dung component con */}
      <div className="p-8 bg-white rounded-lg shadow-lg">{renderContent()}</div>
    </div>
  );
};

const renderTabButton = (tabKey, label, activeTab, setActiveTab, icon) => (
  <button
    onClick={() => setActiveTab(tabKey)}
    className={`flex items-center mx-4 py-2 px-6 rounded-lg transition-colors duration-300 ${
      activeTab === tabKey
        ? "bg-main-blue2 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </button>
);
const AccountComponent = ({ web, theme }) => (
  <div className="bg-white">
    <h2 className="text-2xl font-bold mb-4">Cài đặt tài khoản</h2>
    <div className=" p-4 border-t  ">
      <h2
        className={`text-18 font-semibold mb-4 flex items-center ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <IoSettingsOutline className="mr-2 " />
        Cài đặt & quyền riêng tư
      </h2>
      <ChangePassword />
    </div>
    <div className="p-6 ">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.05 }}
        className="mx-auto grid max-w-7xl grid-flow-dense grid-cols-12 gap-4"
      >
        <AboutBlock web={web} theme={theme} />
        <LocationBlock web={web} theme={theme} />
        <EmailListBlock web={web} theme={theme} />
      </motion.div>
    </div>
  </div>
);

const PrivacyPolicyComponent = ({ theme }) => (
  <div className="bg-white p-6 ">
    <h2 className="text-2xl font-bold mb-4">Chính sách bảo mật</h2>
    <div className={`shadow-md p-4 border-t ${themeBorderClass(theme)}`}>
      <h2
        className={`text-18 font-semibold mb-4 flex items-center ${themeTextClass(
          theme
        )}`}
      >
        <FaServicestack className={`mr-2 ${themeIconClass(theme)}`} />
        Điều khoản dịch vụ
      </h2>
      <Service />
    </div>
    <div className={`shadow-md p-4 border-t ${themeBorderClass(theme)}`}>
      <h2
        className={`text-18 font-semibold mb-4 flex items-center ${themeTextClass(
          theme
        )}`}
      >
        <FaShieldAlt className={`mr-2 ${themeIconClass(theme)}`} />
        Chính sách riêng tư
      </h2>
      <PrivacyPolicy />
    </div>
    <div className={`shadow-md p-4 border-t ${themeBorderClass(theme)}`}>
      <h2
        className={`text-18 font-semibold mb-4 flex items-center ${themeTextClass(
          theme
        )}`}
      >
        <FaQuestionCircle className={`mr-2 ${themeIconClass(theme)}`} />
        F&Q
      </h2>
      <FAQ />
    </div>
  </div>
);

const AboutTeamComponent = ({ theme }) => (
  <div className="bg-white p-6 ">
    <h2 className="text-2xl font-bold mb-4">Về đội ngũ của chúng tôi</h2>
    <div className={`shadow-md p-4 border-t ${themeBorderClass(theme)}`}>
      <h2
        className={`text-18 font-semibold mb-4 flex items-center ${themeTextClass(
          theme
        )}`}
      >
        <FaUserTie className={`mr-2 ${themeIconClass(theme)}`} />
        About US
      </h2>
      <CreateBy />
    </div>
  </div>
);

const AboutBlock = ({ web, theme }) => (
  <Block className="col-span-12 leading-snug">
    <p className={`text-18 ${themeTextClass(theme)}`}>
      Thông tin về chúng tôi!
      <br />
      <span className={themeSubtitleClass(theme)}>{web.about}</span>
    </p>
  </Block>
);

const LocationBlock = ({ web, theme }) => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className={`text-3xl ${themeIconClass(theme)}`} />
    <p className="text-center text-lg text-zinc-400">
      {web.location || "Vị trí không có sẵn"}
    </p>
  </Block>
);

const EmailListBlock = ({ web, theme }) => (
  <Block className="col-span-12 md:col-span-9">
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-start gap-4"
    >
      <div className={`mt-4 p-4 rounded shadow-md ${themeTextClass(theme)}`}>
        <h3 className="text-18 font-semibold mb-2">Thông tin bổ sung</h3>
        <p className="text-18">
          Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào, vui lòng liên
          hệ với chúng tôi qua email hoặc điện thoại. Chúng tôi luôn sẵn sàng hỗ
          trợ bạn!
        </p>
        <p className="mt-2">
          <strong>Link:</strong> {web.link}
        </p>
        <p className="mt-2">
          <strong>Địa chỉ email:</strong> {web.email}
        </p>
        <p className="mt-2">
          <strong>Số điện thoại:</strong> {web.phone_number}
        </p>
      </div>
      <a
        href={`mailto:${web.email}`}
        className="flex items-center gap-2 rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Liên hệ qua email
      </a>
      <a
        href={`tel:${web.phone_number}`}
        className="flex items-center gap-2 rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiPhoneCall /> Liên hệ qua điện thoại
      </a>
    </form>
  </Block>
);

// Các hàm tiện ích cho theme
const themeTextClass = (theme) =>
  theme === "dark" ? "text-gray-300" : "text-black";
const themeSubtitleClass = (theme) =>
  theme === "dark" ? "text-gray-400" : "text-gray-500";
const themeBorderClass = (theme) =>
  theme === "dark" ? "border-gray-700" : "border-gray-200";
const themeIconClass = (theme) =>
  theme === "dark" ? "text-gray-500" : "text-gray-500";

export default Setting;
