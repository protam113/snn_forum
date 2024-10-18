import { useState, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useUserInfo = () => {
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const changePassword = useCallback(
    async (data) => {
      const token = await getToken();
      if (!token) return { success: false, error: "No token available" };

      try {
        await authApi(token).patch(endpoints.ChangePassword, data, {
          headers: { "Content-Type": "application/json" },
        });
        return { success: true };
      } catch (err) {
        console.error(
          "Error changing password:",
          err.response?.data || err.message
        );
        setError(err.response?.data || err.message);
        return {
          success: false,
          error: err.response?.data || "Failed to change password",
        };
      }
    },
    [getToken]
  );

  const resetPassword = useCallback(async (email, newPassword, code) => {
    try {
      const response = await authApi().post(endpoints.Verify, {
        email,
        new_password: newPassword,
        code,
      });
      return { success: true, data: response.data };
    } catch (err) {
      console.error(
        "Error resetting password:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data || "Failed to reset password",
      };
    }
  }, []);

  const requestVerificationCode = useCallback(async (email) => {
    try {
      await authApi().post(process.env.REACT_APP_Request_Code_ENDPOINT, {
        email,
      });
      return { success: true };
    } catch (err) {
      console.error(
        "Error requesting verification code:",
        err.response?.data || err.message
      );
      setError(err.response?.data || err.message);
      return {
        success: false,
        error: err.response?.data || "Failed to send verification code",
      };
    }
  }, []);

  return {
    error,
    changePassword,
    resetPassword,
    requestVerificationCode,
  };
};

export default useUserInfo;
