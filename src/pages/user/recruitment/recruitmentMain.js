import React from "react";
import { useTheme } from "../../../context/themeContext";
import Recruitment_feed from "./components/Recruitment_feed";
import RecruitmentSidebar from "./components/RecruitmentSidebar";
import RecentCompany from "../company/components/recentCompany";
import { Link } from "react-router-dom";

const RecruitmentMain = () => {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen flex">
      <div className="flex-1 overflow-y-auto p-4">
        <hr
          className={`my-4 border-${theme === "dark" ? "gray-700" : "white"}`}
        />
        <h1 className="font-bold text-24">
          <span
            className={`${
              theme === "dark" ? "text-red-400" : "text-custom-red"
            }`}
          >
            Tuyển
          </span>{" "}
          <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            Dụng
          </span>
        </h1>
        <hr
          className={`my-4 border-${theme === "dark" ? "gray-700" : "white"}`}
        />
        <div className="flex items-center justify-between mb-4">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            } border-l-4 border-custom-red pl-2`}
          >
            Đề Xuất Việc
          </h1>
          <Link
            to="/tuyen_dung/job"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Xem thêm
          </Link>
        </div>

        {/* <hr className={`my-2 border-${theme === "dark" ? "gray-700" : "white"}`} /> */}
        <Recruitment_feed />

        <div className="flex items-center justify-between mb-4">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            } border-l-4 border-custom-red pl-2`}
          >
            Đề Xuất Công Ty
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Xem thêm
          </button>
        </div>

        {/* <hr className={`my-2 border-${theme === "dark" ? "gray-700" : "white"}`} /> */}
        {/* <Recruitment_feed /> */}
        <RecentCompany />
      </div>
      <RecruitmentSidebar />
    </div>
  );
};

export default RecruitmentMain;
