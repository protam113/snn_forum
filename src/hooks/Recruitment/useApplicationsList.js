import { useState } from "react";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";
import { useToastDesign } from "../../context/ToastService";

const useErrorHandling = () => {
  const [errMsg, setErrMsg] = useState("");
  const { addNotification } = useToastDesign();

  const handleErrorLogin = (err) => {
    if (!err.response) {
      setErrMsg("Không có phản hồi từ máy chủ");
      addNotification("Không có phản hồi từ máy chủ", "error");
    } else if (err.response.status === 400) {
      setErrMsg("Sai tên đăng nhập hoặc mật khẩu");
      addNotification("Sai tên đăng nhập hoặc mật khẩu", "warning");
    } else {
      setErrMsg(
        "Đăng nhập thất bại: " +
          (err.response.data?.message || "Đã xảy ra lỗi không mong muốn")
      );
    }
    toast.error(errMsg);
  };

  const handleSuccessLogin = (message) => {
    Sentry.success(message);
  };

  const handleErrorBlog = (err) => {
    if (!err.response) {
      setErrMsg("Không có phản hồi từ máy chủ");
    } else if (err.response.status === 400) {
      // Hiển thị thông báo lỗi cụ thể từ backend nếu có
      setErrMsg(err.response.data?.detail || "Yêu cầu không hợp lệ");
    } else if (err.response.status === 401) {
      setErrMsg("Không có quyền truy cập");
    } else {
      setErrMsg(
        "Đã xảy ra lỗi: " +
          (err.response.data?.message || "Đã xảy ra lỗi không mong muốn")
      );
    }
    toast.error(errMsg);
  };

  const handleSuccessBlog = (message) => {
    Sentry.success(message);
  };

  return {
    errMsg,
    handleErrorLogin,
    handleSuccessLogin,
    handleErrorBlog,
    handleSuccessBlog,
  };
};

export default useErrorHandling;
