import React from "react";
import { FaHotjar } from "react-icons/fa";
import { useTheme } from "../../../../context/themeContext";
import Loading from "../../../error/load";
import { useNavigate } from "react-router-dom";
import { useRecruitmentList } from "../../../../hooks/useFetchList";
import { useUser } from "../../../../context/UserProvider";

const RecruitmentSidebar = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: recruitments = [], error, isLoading } = useRecruitmentList();

  const handlePostClick = (postId) => {
    navigate(`/tuyen_dung/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate("/tuyen_dung/tao_tin_tuyen_dung");
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return <p className="text-red-500">Đã xảy ra lỗi khi lấy tin tuyển dụng</p>;

  // Ensure recruitments is an array
  const recentActivities = Array.isArray(recruitments)
    ? recruitments.slice(0, 10)
    : [];

  return (
    <div className="w-96 p-4 top-0 right-0 overflow-y-auto overflow-x-hidden hidden md:block">
      {/* Link to Create Post */}
      {userInfo ? (
        <button
          className={`w-full py-3 mb-6 rounded-lg text-white ${
            theme === "dark"
              ? "bg-main-blue1 hover:bg-blue-700"
              : "bg-main-blue1 hover:bg-blue-600"
          } transition-colors duration-200`}
          onClick={handleCreatePostClick}
        >
          Đăng Tin
        </button>
      ) : (
        <p className="text-gray-600 text-center">
          Bạn cần{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            đăng nhập
          </a>{" "}
          để có thể đăng tin
        </p>
      )}

      <div
        className={`p-4 rounded-lg mb-6 ${
          theme === "dark" ? "border-zinc-700 " : "border-zinc-300 "
        }`}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Công Việc Mới
            </span>
            <FaHotjar className="text-red-500" />
          </h2>
        </div>

        <div className="grid gap-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-3 transition-colors ${
                theme === "dark"
                  ? " hover:bg-zinc-700 border border-zinc-700"
                  : " hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => handlePostClick(activity.id)}
            >
              <img
                src="https://static.chotot.com/storage/chotot-icons/png/jobtype_v2/2.png"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div
                className={`grid gap-1 ${
                  theme === "dark" ? "text-white" : "text-black"
                } `}
              >
                <div className="font-medium text-14">
                  {activity.user.first_name || "Unknown"}{" "}
                  {activity.user.last_name || "User"}
                </div>
                <div className="text-16">
                  {activity.content || "No content available"}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-block h-3 w-3 bg-current text-current rounded-full"></span>
                  {activity.location || "Unknown location"}
                </div>
              </div>
              <div
                className={`grid gap-1 text-right ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <div className="font-medium text-14">
                  {activity.salary || "N/A"}
                </div>
                <div className="text-14">{activity.quantity || 0} openings</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentSidebar;
