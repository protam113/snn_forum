import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const RejectPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="text-center bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <FaExclamationTriangle className="text-red-600 text-6xl mb-4 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Xác thực không thành công!
        </h1>
        <p className="text-gray-700 mb-6">
          Có vấn đề xảy ra khi xác thực tài khoản của bạn. Vui lòng kiểm tra lại
          liên kết trong email hoặc thử lại sau.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Trở về trang đăng ký
        </button>
      </div>
    </div>
  );
};

export default RejectPage;
