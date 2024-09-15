import React, { useState, useEffect } from "react";
import { MdOutlinePassword } from "react-icons/md";
import { FaLock, FaLockOpen, FaSun } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Accordion from "./Accordion";
import useUserInfo from "../../../../hooks/useUserInfo";
import ThemeToggle from "../../../../components/theme/ThemeToggle ";
import { useTheme } from "../../../../context/themeContext";
import { useToastDesign } from "../../../../context/ToastService";

const ChangePassword = () => {
  const { changePassword, userInfo } = useUserInfo();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { addNotification } = useToastDesign();

  useEffect(() => {
    if (formData.newPassword && confirmPassword) {
      if (formData.newPassword === confirmPassword) {
        setIsPasswordMismatch(false);
        setIsSubmitEnabled(true);
      } else {
        setIsPasswordMismatch(true);
        setIsSubmitEnabled(false);
      }
    } else {
      setIsPasswordMismatch(false);
      setIsSubmitEnabled(false);
    }
  }, [formData.newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data object to send as JSON
    const data = {
      old_password: formData.oldPassword,
      new_password: formData.newPassword,
    };

    // Send change password request
    try {
      const result = await changePassword(data);
      if (result.success) {
        addNotification("Password changed successfully", "success");
        setSuccess(true);
        setError(null);
        // Clear the form fields
        setFormData({ oldPassword: "", newPassword: "" });
        setConfirmPassword("");
      } else {
        console.error(result.error || "Failed to change password");
        setSuccess(false);
        setError(result.error || "Failed to change password");
      }
    } catch (error) {
      addNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
      setSuccess(false);
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark" ? " text-gray-300" : " text-gray-800"
      }`}
    >
      {userInfo ? (
        <Accordion
          title={
            <div
              className={`flex items-center text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              <RiLockPasswordLine
                className={`mr-3 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              />
              Đổi Mật Khẩu
              <br />
              {error && (
                <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
                  <span>{error}</span>
                </div>
              )}
            </div>
          }
          answer={
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label
                  className={`flex items-center mb-2 font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  htmlFor="old-password"
                >
                  <FaLock
                    className={`mr-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  Mật khẩu cũ
                </label>
                <input
                  type="password"
                  id="old-password"
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  className={`p-3 border rounded-lg ${
                    isPasswordMismatch ? "border-red-500" : "border-gray-300"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-white text-gray-800"
                  }`}
                  placeholder="Nhập mật khẩu cũ"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  className={`flex items-center mb-2 font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  htmlFor="new-password"
                >
                  <FaLockOpen
                    className={`mr-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className={`p-3 border rounded-lg ${
                    isPasswordMismatch ? "border-red-500" : "border-gray-300"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-white text-gray-800"
                  }`}
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  className={`flex items-center mb-2 font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  htmlFor="confirm-password"
                >
                  <MdOutlinePassword
                    className={`mr-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  />
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`p-3 border rounded-lg ${
                    isPasswordMismatch ? "border-red-500" : "border-gray-300"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-white text-gray-800"
                  }`}
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className={`px-6 py-3 font-semibold rounded-lg ${
                  isSubmitEnabled
                    ? theme === "dark"
                      ? "bg-blue-500"
                      : "bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white`}
              >
                Đổi Mật Khẩu
              </button>

              {isPasswordMismatch && (
                <p className="text-red-500">Mật khẩu mới không khớp!</p>
              )}
            </form>
          }
        />
      ) : null}

      <Accordion
        title={
          <div
            className={`flex items-center text-lg font-semibold mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <FaSun
              className={`mr-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            />
            Chế Độ
          </div>
        }
        answer={
          <div>
            <hr
              className={`mt-4 ${
                theme === "dark" ? "border-zinc-800" : "border-white"
              }`}
            />
            <ThemeToggle />
          </div>
        }
      />
    </div>
  );
};

export default ChangePassword;
