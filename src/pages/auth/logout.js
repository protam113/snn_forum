import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div
      className="flex items-center py-2 px-6 text-dark-blue2 hover:bg-main-blue1 border border-transparent hover:border-white hover:rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
      onClick={logout}
    >
      <BiLogOut className="text-xl" />
      <span className="ml-2">Logout</span>
    </div>
  );
};

export default LogoutButton;
