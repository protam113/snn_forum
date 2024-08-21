import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmPage = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="text-center  shadow-lg rounded-lg p-6 max-w-md w-full">
        <FaCheckCircle className="text-green-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Chúc mừng bạn đã đăng ký thành công!
        </h1>
        <p className="text-gray-700 mb-6">
          Chúng tôi đã gửi một email xác thực đến địa chỉ của bạn. Vui lòng kiểm
          tra email của bạn để xác nhận tài khoản.
        </p>
        <button
          onClick={handleGoToLogin}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;
