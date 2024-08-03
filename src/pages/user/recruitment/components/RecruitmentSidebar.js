import React from "react";
import Block from "../../../../components/design/Block";
import { FaHotjar } from "react-icons/fa";
import Logo from "../../../../assets/img/Logo.svg";
import { useTheme } from "../../../../context/themeContext";

const RecruitmentItem = ({ company, salary, position }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-1 border rounded-lg w-full max-w-[300px] h-[150px] flex flex-col box-border transition-colors ${
        theme === "dark"
          ? "border-zinc-800 hover:bg-zinc-800"
          : "border-zinc-200 hover:bg-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <div className="ml-4">
            <p
              className={`text-14 font-bold ] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {company}
            </p>
            <p
              className={`text-14  ${
                theme === "dark" ? "text-zinc-400" : "text-gray-500"
              }`}
            >
              {salary}
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
          {position}
        </p>
      </div>
    </div>
  );
};

const RecruitmentSidebar = () => {
  const { theme } = useTheme();

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
              className={`            ${
                theme === "dark" ? "text-white" : "text-black"
              }
`}
            >
              Công Việc Mới
            </span>
            <FaHotjar className="text-red-500" />
          </h2>
          <a href="/" className="text-blue-500">
            See all
          </a>
        </div>

        <RecruitmentItem
          company="Công ty TNHH Điện Tự Động Hóa Song Nhật Nguyên"
          salary="15-20 triệu"
          position="Nhân Viên Bảo Trì - Thu Nhập Lên Đến 15 Triệu - Đi Làm Tại Quận 1"
        />
        <RecruitmentItem
          company="Công ty TNHH Điện Tự Động Hóa Song Nhật Nguyên"
          salary="15-20 triệu"
          position="Nhân Viên Bảo Trì - Thu Nhập Lên Đến 15 Triệu - Đi Làm Tại Quận 2"
        />
        <RecruitmentItem
          company="Công ty TNHH Điện Tự Động Hóa Song Nhật Nguyên"
          salary="15-20 triệu"
          position="Nhân Viên Bảo Trì - Thu Nhập Lên Đến 15 Triệu - Đi Làm Tại Quận 3"
        />
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {/* <FSuggestion /> */}
      </div>
    </div>
  );
};

export default RecruitmentSidebar;
