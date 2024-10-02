import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmPage = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="text-center  shadow-lg rounded-lg p-6 max-w-md w-full">
        <FaCheckCircle className="text-green-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Chúc mừng bạn đã đăng ký thành công!
        </h1>
        <p className="text-gray-700 mb-6">
          Bạn đã xác thực tài khoản thành công! Bây giờ, bạn có thể truy cập vào
          hệ thống. Nhấn nút dưới đây để quay về trang đăng nhập và bắt đầu sử
          dụng dịch vụ.
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
