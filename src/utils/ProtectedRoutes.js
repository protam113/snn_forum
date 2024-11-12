import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const ProtectedRoutes = ({ children }) => {
  const { userRoles, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  // Nếu userRoles là null, không cho phép truy cập
  if (userRoles === null) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
