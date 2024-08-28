import React, { createContext, useState } from "react";
import { authApi, endpoints, baseURL } from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  removeLocalStorage,
  encryptData, // Function to encrypt data
  decryptData, // Function to decrypt data
} from "../utils/cryptoUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const getToken = () => {
    const encryptedToken = localStorage.getItem("access_token");
    return encryptedToken ? decryptData(encryptedToken) : null;
  };

  const refreshAccessToken = async () => {
    const encryptedRefreshToken = Cookies.get("refresh_token");
    const refreshToken = encryptedRefreshToken
      ? decryptData(encryptedRefreshToken)
      : null;
    console.log("Attempting to refresh token with:", refreshToken);

    if (refreshToken) {
      try {
        const api = authApi();
        const response = await api.post(endpoints.refreshLogin, {
          refreshToken: refreshToken,
        });
        const { access_token } = response.data;
        const encryptedAccessToken = encryptData(access_token);
        localStorage.setItem("access_token", encryptedAccessToken);
        setAuth((prevAuth) => ({
          ...prevAuth,
          access_token: encryptedAccessToken,
        }));
        console.log("Token refreshed successfully");
      } catch (err) {
        console.error("Error refreshing access token", err);
        logout();
      }
    } else {
      console.log("No refresh token found");
      logout();
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `${baseURL}${endpoints.login}`,
        new URLSearchParams({
          grant_type: "password",
          client_id: process.env.REACT_APP_client_id_ENDPOINT,
          client_secret: process.env.REACT_APP_client_secret_ENDPOINT,
          username,
          password,
        })
      );
      const { access_token, refresh_token } = response.data;
      const encryptedAccessToken = encryptData(access_token);
      const encryptedRefreshToken = encryptData(refresh_token);
      setAuth({ username, access_token: encryptedAccessToken });
      localStorage.setItem("access_token", encryptedAccessToken);
      Cookies.set("refresh_token", encryptedRefreshToken, { secure: true });
      toast.success("Login successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Login error: ", err);
      if (!err.response) {
        toast.error("No Server Response");
      } else if (err.response.status === 400) {
        toast.error("Incorrect username or password");
      } else if (err.response.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error(
          "Login Failed: " +
            (err.response.data.message || "An unexpected error occurred")
        );
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    Cookies.remove("refresh_token");

    removeLocalStorage("user_info");

    localStorage.clear();
    sessionStorage.clear();

    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=; Max-Age=-99999999;";
    }

    setAuth(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleLogin,
        logout,
        getToken,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
