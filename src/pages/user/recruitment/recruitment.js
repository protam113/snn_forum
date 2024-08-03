import React from "react";
import RecruitmentSidebar from "./components/RecruitmentSidebar";
import Recruitment_feed from "./components/Recruitment_feed";
import { useTheme } from "../../../context/themeContext";

const Recruitment = () => {
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
        <h1
          className={`text-20 font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          } `}
        >
          Đề Xuất
        </h1>
        {/* <hr className={`my-2 border-${theme === "dark" ? "gray-700" : "white"}`} /> */}
        <Recruitment_feed />
      </div>
      <RecruitmentSidebar />
    </div>
  );
};

export default Recruitment;
