// hooks/requireAuth.js
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useUserInfo from "./useUserInfo";

export const RequireAuth = ({ allowedRoles, children }) => {
  const { auth } = useContext(AuthContext);
  const { userRoles } = useUserInfo();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!auth) {
        navigate(-1);
        return;
      }

      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
      if (hasAccess) {
        setLoading(false);
      } else {
        navigate(-1);
      }
    };

    checkAccess();
  }, [auth, userRoles, allowedRoles, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};
