import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/img/Logo.svg";
import Logo_google from "../../assets/img/logo_google.svg";
import Footer from "../../components/layouts/DefaultLayout/components/footer";
import { useTheme } from "../../context/themeContext";
import { toast } from "react-toastify";
import { endpoints, baseURL } from "../../api/api";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const { theme } = useTheme();
  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}${endpoints.login}`,
        new URLSearchParams({
          grant_type: "password",
          client_id: "FX4glR4JIGLryn5EaXp4cjh21n8sZvuaqMqTrU1S",
          client_secret:
            "L2DWvzpcf6OW7MFiFanE0y3sEQN6dBxGF93QcAQO8LEZqpUevFwGDbqVxUECr70Iy0BbODuysHAKICax3CkgOSWT6wpVbHd6TSInh4rotyQmMBpdZO9iDUy2l2wODimD",
          username,
          password,
        })
      );
      const { access_token, refresh_token } = response?.data;
      setAuth({ username, password, access_token });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      setUsername("");
      setPassword("");
      toast.success("Login successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Login error: ", err);
      if (!err.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error(
          "Login Failed: " + err.response?.data?.message ||
            "An unexpected error occurred"
        );
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`absolute top-4 left-4 flex items-center ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-500 hover:text-blue-700"
          }`}
        >
          <FaArrowLeft size={24} />
          <span className="ml-2">Back</span>
        </button>
        <div
          className={`border p-6 rounded-lg shadow-md max-w-sm w-full ${
            theme === "dark"
              ? "border-zinc-600 bg-zinc-700"
              : "border-zinc-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-16 h-auto mr-4" />
            <div className="text-lg">
              <span className="text-custom-red font-bold">Tech</span>{" "}
              <span
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Forum
              </span>
            </div>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <button
              type="button"
              className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                theme === "dark"
                  ? "bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600"
                  : "bg-white text-black border-zinc-800 hover:bg-zinc-300"
              }`}
            >
              <span className="mr-4">Log in with Google</span>
              <img
                src={Logo_google}
                alt="Google Logo"
                className="w-6 h-auto" // Adjust size as needed
              />
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <label
              htmlFor="username"
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Username:
            </label>
            <input
              type="text"
              placeholder="Phone number, username, or email"
              id="username"
              autoComplete="off"
              className={`px-4 py-2 border rounded-lg ${
                theme === "dark"
                  ? "border-zinc-600 bg-zinc-700 text-white"
                  : "border-zinc-400 bg-white text-black"
              }`}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label
              htmlFor="password"
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              className={`px-4 py-2 border rounded-lg ${
                theme === "dark"
                  ? "border-zinc-600 bg-zinc-700 text-white"
                  : "border-zinc-400 bg-white text-black"
              }`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-custom-red text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-4 text-black">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
