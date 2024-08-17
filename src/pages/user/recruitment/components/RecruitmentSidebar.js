import React from "react";
import { FaHotjar } from "react-icons/fa";
import { useTheme } from "../../../../context/themeContext";
import useRecruitment from "../../../../hooks/useRecruitment";
import Loading from "../../../error/load";
import { useNavigate } from "react-router-dom";
import useTokenCheck from "../../../../hooks/useTokenCheck";

const RecruitmentSidebar = () => {
  const hasToken = useTokenCheck();

  const navigate = useNavigate();
  const { theme } = useTheme();
  const { recruitments, loading, error } = useRecruitment();

  const handlePostClick = (postId) => {
    navigate(`/recruitment/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate("/tuyen_dung/tao_tin_tuyen_dung");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return <p className="text-red-500">Đã xảy ra lỗi khi lấy tin tuyển dụng</p>;

  const recentActivities = recruitments.slice(0, 10);

  return (
    <div className="w-96 p-4 top-0 right-0 overflow-y-auto overflow-x-hidden hidden md:block">
      {/* Link to Create Post */}
      {hasToken ? (
        <button
          className={`w-full py-3 mb-6 rounded-lg text-white ${
            theme === "dark"
              ? "bg-custom-red hover:bg-red-700"
              : "bg-custom-red hover:bg-red-600"
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
          theme === "dark"
            ? "border-zinc-700 bg-zinc-900"
            : "border-zinc-300 bg-white"
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
          <a href="/" className="text-blue-500">
            See all
          </a>
        </div>

        <div className="grid gap-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id} // Make sure to use a unique identifier
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg p-3 transition-colors ${
                theme === "dark"
                  ? "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700"
                  : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
              }`}
              onClick={() => handlePostClick(activity.id)}
            >
              <img
                src="https://static.chotot.com/storage/chotot-icons/png/jobtype_v2/2.png"
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="grid gap-1">
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
              <div className="grid gap-1 text-right">
                <div className="font-medium text-14">
                  {activity.salary || "N/A"}
                </div>
                <div className="text-14">{activity.quantity || 0} openings</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {/* <FSuggestion /> */}
      </div>
    </div>
  );
};

export default RecruitmentSidebar;
