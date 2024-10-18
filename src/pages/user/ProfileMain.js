import React from "react"; // Thư viện React
import { useParams } from "react-router-dom"; // Hook để lấy tham số từ URL
import Profile from "./profile"; // Component hiển thị thông tin người dùng
import ProfileIf from "./profile/Personal/ProfileIf"; // Component hiển thị thông tin người dùng khác
import Loading from "../error/load"; // Component hiển thị loading khi dữ liệu đang được tải
import { useUser } from "../../context/UserProvider";

const ProfileMain = () => {
  const { id } = useParams(); // Lấy id từ tham số URL
  const { userInfo, loading, error } = useUser(); // Lấy thông tin người dùng, trạng thái loading và lỗi từ hook

  // Nếu dữ liệu đang được tải, hiển thị component Loading
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );

  // Nếu có lỗi xảy ra, hiển thị thông báo lỗi
  if (error) return <div>Error: {error}</div>;

  // Kiểm tra xem người dùng hiện tại có phải là người dùng đang xem không
  const isCurrentUser = userInfo && userInfo.id.toString() === id;

  // Nếu là người dùng hiện tại, hiển thị component Profile; ngược lại, hiển thị component ProfileIf
  return isCurrentUser ? <Profile /> : <ProfileIf />;
};

export default ProfileMain; // Xuất component ProfileMain
