import React, { createContext, useState, useEffect } from "react";
import {
  authApi,
  endpoints,
  refreshToken as refreshTokenApi,
} from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");

  const refreshAuthToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    try {
      const response = await refreshTokenApi(refreshToken);
      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error) {
      console.error("Error refreshing token", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setAuth(null);
      if (location.pathname !== "/register") navigate("/login");
      return null;
    }
  };

  const fetchCurrentUser = async () => {
    let token = getToken();
    if (token) {
      try {
        const api = authApi(token);
        const response = await api.get(endpoints.currentUser);
        if (response.data && response.data.profile) {
          setAuth({ ...response.data, isAuthenticated: true });
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setAuth(null);
          if (location.pathname !== "/register") navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const newToken = await refreshAuthToken();
          if (newToken) {
            const api = authApi(newToken);
            const response = await api.get(endpoints.currentUser);
            setAuth({ ...response.data, isAuthenticated: true });
          }
        } else {
          console.error("Error fetching current user", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setAuth(null);
          if (location.pathname !== "/register") navigate("/login");
        }
      }
    } else {
      setAuth(null);
      if (location.pathname !== "/register") navigate("/login");
    }
  };

  const login = async (username, password) => {
    try {
      const response = await authApi().post(endpoints.login, {
        username,
        password,
      });
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const userResponse = await authApi(access_token).get(
        endpoints.currentUser
      );
      setAuth({ ...userResponse.data, isAuthenticated: true });
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login,
        logout,
        fetchCurrentUser,
        getToken,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
