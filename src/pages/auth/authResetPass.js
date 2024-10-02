import React, { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { useToastDesign } from "../../context/ToastService";
import { useTheme } from "../../context/themeContext";

const ResetPassword = () => {
  const { theme } = useTheme();
  const { resetPassword, requestVerificationCode } = useUserInfo();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    code: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [codeRequested, setCodeRequested] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errMsg1, setErrMsg1] = useState("");
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

  const handleRequestCode = async (e) => {
    e.preventDefault();

    const result = await requestVerificationCode(formData.email);
    if (result.success) {
      setErrMsg1("Verification code sent to your email");
      setCodeRequested(true);
    } else {
      addNotification(
        result.error || "Failed to send verification code",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await resetPassword(
      formData.email,
      formData.newPassword,
      formData.code
    );
    if (result.success) {
      setErrMsg("Password reset successfully");
      setFormData({ ...formData, newPassword: "", code: "" });
      setConfirmPassword("");
      setCodeRequested(false);
    } else {
      addNotification(result.error || "Failed to reset password", "error");
    }
  };

  return (
    <div className="p-6">
      {!codeRequested ? (
        <form
          onSubmit={handleRequestCode}
          className="flex justify-center items-center p-8"
        >
          <div className="space-y-6">
            {" "}
            {/* Thêm khoảng cách giữa các phần */}
            <div
              className={`border p-6 rounded-lg shadow-md max-w-sm w-full ${
                theme === "dark"
                  ? "border-zinc-600 bg-zinc-700"
                  : "border-zinc-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="text-lg">
                  <span className="text-main-blue1 font-bold">H2H Tech</span>{" "}
                  <span
                    className={`font-semibold ${
                      theme === "light" ? "text-zinc-900" : "text-white"
                    }`}
                  >
                    Energy
                  </span>
                </div>
              </div>
              <h2 className="text-24 md:text-18 font-bold mb-4">
                Đặt lại mật khẩu của bạn
              </h2>
              <p className="text-muted-foreground text-16 mb-4">
                {" "}
                Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã để đặt
                lại mật khẩu.
              </p>
              {errMsg && (
                <div className="flex items-center justify-center border-red-500 bg-red-100 text-red-600 mb-4">
                  <span>{errMsg}</span>
                </div>
              )}
              <div className="flex flex-col space-y-4">
                <div className="flex gap-2 w-full">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="p-2 border rounded-lg border-gray-300 w-full"
                    placeholder="Enter your email"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py text-white font-semibold rounded-lg bg-blue-600"
                  >
                    Yêu cầu mã xác minh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-6 max-w-lg mx-auto"
        >
          <div className="flex flex-col">
            {errMsg1 && (
              <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
                <span>{errMsg1}</span>
              </div>
            )}
            <label
              className="mb-2 text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-600"
              htmlFor="code"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              placeholder="Enter verification code"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-600"
              htmlFor="new-password"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className={`p-3 border rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
                isPasswordMismatch
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-600"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`p-3 border rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${
                isPasswordMismatch
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition duration-300 ${
              isSubmitEnabled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Reset Password
          </button>

          {isPasswordMismatch && (
            <p className="mt-3 text-sm text-red-500">Passwords do not match</p>
          )}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
