import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { authApi, endpoints } from "../api/api";

const useAuth = () => {
  const [currentInfo, setCurrentInfo] = useState(null);
  const [currentLoading, setCurrentLoading] = useState(true);
  const [currentError, setCurrentError] = useState(null);
  const context = useContext(AuthContext);

  // Destructure getToken from context
  const { getToken } = context;

  const fetchCurrentInfo = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      setCurrentInfo(null);
      setCurrentLoading(false);
      return;
    }

    try {
      const response = await authApi(token).get(endpoints.currentUser);
      const userData = response.data;
      setCurrentInfo(userData);
    } catch (err) {
      console.error(
        "Error fetching user info:",
        err.response?.data || err.message
      );
      setCurrentError(err.response?.data || err.message);
    } finally {
      setCurrentLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchCurrentInfo();
  }, [fetchCurrentInfo]);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth, setAuth, handleLogin, logout, refreshAccessToken } = context;

  return {
    currentInfo,
    currentLoading,
    currentError,
    auth,
    setAuth,
    handleLogin,
    logout,
    getToken,
    refreshAccessToken,
  };
};

export default useAuth;
