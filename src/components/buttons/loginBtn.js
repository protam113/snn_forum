import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link
      to="/login"
      className="px-6 py-2 bg-custom-red text-white rounded-md hover:bg-red-600 transition-all
      flex items-center  cursor-pointer"
    >
      Login
    </Link>
  );
};

export default LoginBtn;
