import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const {
    auth,
    setAuth,
    login,
    logout,
    fetchCurrentUser,
    getToken,
    refreshAuthToken,
  } = context;

  return {
    auth,
    setAuth,
    login,
    logout,
    fetchCurrentUser,
    getToken,
    refreshAuthToken,
  };
};

export default useAuth;
