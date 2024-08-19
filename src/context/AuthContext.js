import React, { createContext, useState } from "react";
import { authApi, endpoints, baseURL } from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("access_token");

  const refreshAccessToken = async () => {
    const refresh_token = Cookies.get("refresh_token");
    if (refresh_token) {
      try {
        const api = authApi();
        const response = await api.post(endpoints.refreshLogin, {
          refreshToken: refresh_token,
        });
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        setAuth((prevAuth) => ({ ...prevAuth, access_token }));
      } catch (err) {
        console.error("Error refreshing access token", err);
        logout();
      }
    } else {
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
      setAuth({ username, access_token });
      localStorage.setItem("access_token", access_token);
      Cookies.set("refresh_token", refresh_token, { secure: true });
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
