// utils/ProtectedRoutes.js

// Import các thư viện cần thiết
import React from "react";
import { Navigate } from "react-router-dom"; // Điều hướng khi không đủ quyền
import Loading from "../pages/error/load"; // Component hiển thị loading khi dữ liệu đang tải
import { useUser } from "../context/UserProvider"; // Lấy thông tin người dùng từ context

// Component ProtectedRoutes để bảo vệ các route dựa trên quyền hạn của người dùng
const ProtectedRoutes = ({ children, allowedRoles }) => {
  // Lấy thông tin về vai trò người dùng và trạng thái loading từ UserProvider context
  const { userRoles, loading } = useUser();

  // Kiểm tra nếu dữ liệu người dùng đang được tải
  if (loading) {
    // Hiển thị trạng thái loading trong khi chờ dữ liệu
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // Kiểm tra xem người dùng có vai trò được phép truy cập hay không
  const isAllowed = allowedRoles.some((role) => userRoles.includes(role));

  // Nếu người dùng có quyền truy cập, render nội dung bên trong (children)
  if (isAllowed) {
    return children;
  }

  // Nếu người dùng không có quyền, điều hướng về trang chủ
  return <Navigate to="/" replace />;
};

// Export component để sử dụng trong các phần khác của ứng dụng
export default ProtectedRoutes;
