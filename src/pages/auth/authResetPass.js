import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUserInfo from "../../hooks/useUserInfo";

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
      toast.success("Verification code sent to your email");
      setCodeRequested(true);
    } else {
      toast.error(result.error || "Failed to send verification code");
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
      toast.success("Password reset successfully");
      setFormData({ ...formData, newPassword: "", code: "" });
      setConfirmPassword("");
      setCodeRequested(false);
    } else {
      toast.error(result.error || "Failed to reset password");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      {!codeRequested ? (
        <form onSubmit={handleRequestCode} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 border rounded-lg border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 text-white font-semibold rounded-lg bg-blue-600"
          >
            Request Verification Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 border rounded-lg border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 text-gray-700 font-medium"
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
              className={`p-3 border rounded-lg ${
                isPasswordMismatch ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-gray-700 font-medium"
              htmlFor="confirm-password"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`p-3 border rounded-lg ${
                isPasswordMismatch ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm new password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-gray-700 font-medium" htmlFor="code">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="p-3 border rounded-lg border-gray-300"
              placeholder="Enter verification code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              isSubmitEnabled ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Reset Password
          </button>

          {isPasswordMismatch && (
            <p className="text-red-500">Passwords do not match</p>
          )}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
