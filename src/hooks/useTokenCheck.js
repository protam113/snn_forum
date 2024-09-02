import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { decryptData } from "../utils/cryptoUtils";

const useTokenCheck = () => {
  const [hasToken, setHasToken] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = Cookies.get("refresh_token");

    const encryptedUserId = localStorage.getItem("user_info");
    const decryptedUserId = encryptedUserId
      ? decryptData(encryptedUserId)
      : null;

    setUserId(decryptedUserId);
    setHasToken(
      Boolean(accessToken || refreshToken) && Boolean(decryptedUserId)
    );
  }, []);

  return { hasToken, userId };
};

export default useTokenCheck;
