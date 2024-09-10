import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import Logo from "../../assets/img/Logo.svg";
import Logo_google from "../../assets/img/logo_google.svg";
import Footer from "../../components/layouts/DefaultLayout/components/footer";

const Login = () => {
  const { theme } = useTheme();
  const { handleLogin } = React.useContext(AuthContext);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
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
              <span className="text-custom-red font-bold">H2H Tech</span>{" "}
              <span
                className={`font-semibold ${
                  theme === "light" ? "text-zinc-900" : "text-white"
                }`}
              >
                Energy
              </span>
            </div>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            {/* <button
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
                className="w-6 h-auto"
              />
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div> */}

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className={`px-4 py-2 border rounded-lg w-full ${
                  theme === "dark"
                    ? "border-zinc-600 bg-zinc-700 text-white"
                    : "border-zinc-400 bg-white text-black"
                }`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

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

          <div className="text-center mt-2 text-black">
            Forgot your password?{" "}
            <a href="/password/reset/" className="text-blue-500">
              Reset it
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
