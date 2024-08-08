import React from "react";
import { FaHotjar } from "react-icons/fa";
import Logo from "../../../../assets/img/Logo.svg";
import { useTheme } from "../../../../context/themeContext";
import useRecruitment from "../../../../hooks/useRecruitment";
import Loading from "../../../error/load";
import { useNavigate } from "react-router-dom";

const RecruitmentSidebar = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { recruitments, loading, error } = useRecruitment();

  const handlePostClick = (postId) => {
    navigate(`/recruitment/${postId}`);
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
    <div className="w-96 text-white p-4 top-0 right-0 overflow-y-auto overflow-x-hidden hidden md:block">
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

        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className={`p-1 border rounded-lg w-full max-w-[300px] h-[150px] flex flex-col box-border transition-colors cursor-pointer ${
              theme === "dark"
                ? "border-zinc-800 hover:bg-zinc-800"
                : "border-zinc-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePostClick(activity.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={Logo} alt="Logo" className="w-10 h-10" />
                <div className="ml-4">
                  <p
                    className={`text-14 font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {/* {activity.company}{" "} */}
                    {activity.job_description}

                    {/* Hoặc bạn có thể sử dụng trường thích hợp */}
                  </p>
                  <p
                    className={`text-14 ${
                      theme === "dark" ? "text-zinc-400" : "text-gray-500"
                    }`}
                  >
                    {activity.salary_range}{" "}
                    {/* Hoặc bạn có thể sử dụng trường thích hợp */}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-1 border-t pt-2">
              <p
                className={`text-base font-bold text-16 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {activity.job_title}{" "}
                {/* Hoặc bạn có thể sử dụng trường thích hợp */}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {/* <FSuggestion /> */}
      </div>
    </div>
  );
};

export default RecruitmentSidebar;
