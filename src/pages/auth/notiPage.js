import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useTheme } from "../../context/themeContext";

const NotiPage = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center items-center  p-6 ">
      <div
        className={`p-8 rounded-lg shadow-md w-full max-w-md ${
          theme === "dark" ? " border-zinc-600" : " border-zinc-300"
        } border`}
      >
        <div className="flex flex-col items-center mb-6">
          {/* Tiêu đề */}
          <div className="text-lg text-center">
            <span className="text-main-blue1 font-bold">H2H Tech</span>{" "}
            <span
              className={`font-semibold ${
                theme === "light" ? "text-zinc-900" : "text-white"
              }`}
            >
              Energy
            </span>
          </div>

          {/* Icon */}
          <AiOutlineMail className="text-main-blue1 text-4xl mt-3" />
        </div>

        {/* Thông điệp */}
        <h2
          className={`text-lg font-bold mb-4 text-center ${
            theme === "dark" ? "text-white" : "text-zinc-900"
          }`}
        >
          Để đảm bảo an toàn, chúng tôi đã gửi một liên kết xác thực đến địa chỉ
          email của bạn.
        </h2>
        <p
          className={`text-sm mb-6 text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Vui lòng kiểm tra hộp thư chính hoặc thư mục spam và nhấn vào liên kết
          xác thực để hoàn tất đăng ký.
        </p>

        {/* Nút điều hướng */}
      </div>
    </div>
  );
};

export default NotiPage;
