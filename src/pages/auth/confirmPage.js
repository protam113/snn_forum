import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Chúc mừng bạn đã đăng ký thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Chúng tôi đã gửi một email xác thực đến địa chỉ của bạn. Vui lòng kiểm
          tra email của bạn để xác nhận tài khoản.
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Tới Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;
