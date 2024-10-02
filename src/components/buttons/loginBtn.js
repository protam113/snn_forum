import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link
      to="/login"
      className="px-8 py-3 bg-main-blue2 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-hover-blue1 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1
    flex items-center justify-center cursor-pointer"
    >
      Login
    </Link>
  );
};

export default LoginBtn;
