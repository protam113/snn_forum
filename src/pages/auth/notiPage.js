import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const NotiPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
        <AiOutlineMail className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800">
          Xác Nhận Email Đã Được Gửi
        </h1>
        <p className="text-gray-600 mt-2">
          Vui lòng kiểm tra hộp thư chính hoặc thư mục spam của bạn để hoàn tất
          đăng ký.
        </p>
      </div>
    </div>
  );
};

export default NotiPage;
