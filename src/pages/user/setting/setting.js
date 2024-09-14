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
import { useWeb } from "../../../hooks/useWeb";
import Loading from "../../error/load";
import { useTheme } from "../../../context/themeContext";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { Block } from "../../../components/layouts/AdminLayout/components/RevealBento";

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

      <div className="shadow-md p-4 border-t ">
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

      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <AboutBlock web={web} theme={theme} />
        <LocationBlock web={web} theme={theme} />
        <EmailListBlock web={web} theme={theme} />
      </motion.div>

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

const AboutBlock = ({ web, theme }) => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p className={`${theme === "dark" ? "text-gray-300" : "text-black"}`}>
      Thông tin về chúng tôi !
      <br />
      <span
        className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
      >
        {web.about}
      </span>
    </p>
  </Block>
);

const LocationBlock = ({ web, theme }) => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin
      className={` text-3xl ${
        theme === "dark" ? "text-zinc-400" : "text-zinc-600"
      }`}
    />
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
      <div
        className={`mt-4 p-4 rounded   ${
          theme === "dark" ? "text-zinc-200" : "text-zinc-800"
        } shadow-md`}
      >
        <h3 className="text-24 font-semibold mb-2">Thông tin bổ sung</h3>
        <p>
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
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Liên hệ qua email
      </a>
      <a
        href={`tel:${web.phone_number}`}
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiPhoneCall /> Liên hệ qua điện thoại
      </a>
    </form>
  </Block>
);

export default Setting;
