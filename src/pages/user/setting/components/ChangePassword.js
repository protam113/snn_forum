import React, { useState, useEffect } from "react";
import { MdOutlinePassword } from "react-icons/md";
import { FaLock, FaLockOpen, FaSun } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Accordion from "./Accordion";
import useUserInfo from "../../../../hooks/useUserInfo";
import { toast } from "react-toastify";
import ThemeToggle from "../../../../components/theme/ThemeToggle ";

const ChangePassword = () => {
  const { userInfo, changePassword } = useUserInfo();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        toast.success("Password changed successfully");
        setSuccess(true);
        setError(null);
        // Clear the form fields
        setFormData({ oldPassword: "", newPassword: "" });
        setConfirmPassword("");
      } else {
        toast.error(result.error || "Failed to change password");
        setSuccess(false);
        setError(result.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setSuccess(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {userInfo ? (
        <Accordion
          title={
            <div className="flex items-center text-lg font-semibold text-gray-800">
              <RiLockPasswordLine className="mr-3 text-gray-600" />
              Đổi Mật Khẩu
            </div>
          }
          answer={
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label
                  className="flex items-center mb-2 text-gray-700 font-medium"
                  htmlFor="old-password"
                >
                  <FaLock className="mr-2 text-gray-600" />
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
                  }`}
                  placeholder="Nhập mật khẩu cũ"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="flex items-center mb-2 text-gray-700 font-medium"
                  htmlFor="new-password"
                >
                  <FaLockOpen className="mr-2 text-gray-600" />
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
                  }`}
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="flex items-center mb-2 text-gray-700 font-medium"
                  htmlFor="confirm-password"
                >
                  <MdOutlinePassword className="mr-2 text-gray-600" />
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`p-3 border rounded-lg ${
                    isPasswordMismatch ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!isSubmitEnabled}
                className={`px-6 py-3 text-white font-semibold rounded-lg ${
                  isSubmitEnabled
                    ? "bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Đổi Mật Khẩu
              </button>

              {isPasswordMismatch && (
                <p className="text-red-500">Mật khẩu mới không khớp!</p>
              )}
            </form>
          }
        />
      ) : (
        <p className="text-gray-600"></p>
      )}

      <Accordion
        title={
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <FaSun className="mr-3 text-gray-600" />
            Chế Độ
          </div>
        }
        answer={
          <div>
            <ThemeToggle />
          </div>
        }
      />
    </div>
  );
};

export default ChangePassword;
