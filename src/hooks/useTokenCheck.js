// hooks/useTokenCheck.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useTokenCheck = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = Cookies.get("refresh_token");

    setHasToken(Boolean(accessToken || refreshToken));
  }, []);

  return hasToken;
};

export default useTokenCheck;
