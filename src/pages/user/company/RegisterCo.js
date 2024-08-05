import React from "react";
import Footer from "../../../components/layouts/DefaultLayout/components/footer";
import { useTheme } from "../../../context/themeContext";
import Logo from "../../../assets/img/Logo.svg";

const RegisterCo = () => {
  const { theme } = useTheme();

  return (
    <>
      <div className="flex justify-center items-center p-8 min-h-screen">
        <div
          className={`border p-6 rounded-lg shadow-md max-w-4xl w-full ${
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
          <div className="col-span-full flex justify-center mt-4">
            <h1
              type="submit"
              className="px-4 py-2 text-16 font-bold text-black rounded-lg transition-colors w-full max-w-xs"
            >
              Đăng ký tài khoản công ty
            </h1>
          </div>
          <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-4 lg:col-span-2 lg:pr-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="companyname"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Tên Công Ty:
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  id="companyname"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="establishedDate"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Ngày Thành Lập:
                </label>
                <input
                  type="date"
                  id="establishedDate"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="employees"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Số Nhân Sự:
                </label>
                <input
                  type="text"
                  placeholder="Number of employees"
                  id="employees"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="address"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Địa Chỉ:
                </label>
                <input
                  type="text"
                  placeholder="Location"
                  id="address"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4 lg:col-span-1 lg:pl-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Mail:
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  id="email"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="phone"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Số Điện Thoại:
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  id="phone"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="link"
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Link (nếu có):
                </label>
                <input
                  type="text"
                  placeholder="Link"
                  id="link"
                  autoComplete="off"
                  className={`px-4 py-2 border rounded-lg ${
                    theme === "dark"
                      ? "border-zinc-600 bg-zinc-700 text-white"
                      : "border-zinc-400 bg-white text-black"
                  }`}
                  required
                />
              </div>
            </div>
            <div className="col-span-full flex justify-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-custom-red text-white rounded-lg hover:bg-red-600 transition-colors w-full max-w-xs"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterCo;
