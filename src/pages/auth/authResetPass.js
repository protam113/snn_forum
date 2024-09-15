import React, { useEffect, useState } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { useToastDesign } from "../../context/ToastService";

const ResetPassword = () => {
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
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {!codeRequested ? (
        <form
          onSubmit={handleRequestCode}
          className="text-foreground py-12 md:py-16 lg:py-20"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center space-y-4">
              {errMsg && (
                <div className="flex items-center justify-center px-4 py-2 rounded-lg border border-red-500 bg-red-100 text-red-600 mb-4">
                  <span>{errMsg}</span>
                </div>
              )}
              <h2 className="text-3xl md:text-4xl font-bold">
                Reset Your Password
              </h2>
              <p className="text-muted-foreground">
                Enter your email address and we'll send you a code to reset your
                password.
              </p>
              <div className="flex gap-2 w-full">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="p-3 border rounded-lg border-gray-300 w-full"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white font-semibold rounded-lg bg-blue-600"
                >
                  Request Verification Code
                </button>
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
