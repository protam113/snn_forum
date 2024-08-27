import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import AuthContext from "../../context/AuthContext";
import useTokenCheck from "../../hooks/useTokenCheck";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const { hasToken } = useTokenCheck();
  const buttonStyles = hasToken
    ? "flex items-center py-2 px-6 text-neutral-200 hover:text-black cursor-pointer"
    : "flex items-center py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300 ease-in-out cursor-pointer";
  const handleClick = () => {
    if (hasToken) {
      logout();
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className={buttonStyles} onClick={handleClick}>
      <BiLogOut className="text-xl" />
      <span className="ml-2">{hasToken ? "Logout" : "Login"}</span>
    </div>
  );
};

export default LogoutButton;
