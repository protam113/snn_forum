import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div
      className="flex items-center py-2 px-6 text-neutral-200 hover:text-black cursor-pointer"
      onClick={logout}
    >
      <BiLogOut className="text-xl" />
      <span className="ml-2">Logout</span>
    </div>
  );
};

export default LogoutButton;
