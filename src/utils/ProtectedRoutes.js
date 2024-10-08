import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../pages/error/load";
import { useUser } from "../context/UserProvider";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { userRoles, loading } = useUser();

  // console.log("Loading in ProtectedRoutes:", loading);
  // console.log("User Roles in ProtectedRoutes:", userRoles);
  // console.log("Allowed Roles:", allowedRoles);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  const isAllowed = allowedRoles.some((role) => userRoles.includes(role));
  // console.log("Is Allowed:", isAllowed);

  if (isAllowed) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
