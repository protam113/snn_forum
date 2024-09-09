import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { getToken } = context;

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth, setAuth, handleLogin, logout, refreshAccessToken } = context;

  return {
    auth,
    setAuth,
    handleLogin,
    logout,
    getToken,
    refreshAccessToken,
  };
};

export default useAuth;
