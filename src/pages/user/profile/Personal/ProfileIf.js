import React from "react";
import PersonalProfile from "./personalProfile";
import { useTheme } from "../../../../context/themeContext";
import PersonalIf from "./PersonalIf";
import PersonalBlog from "./personalBlog";
import { useNavigate } from "react-router-dom";

const ProfileIf = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Info at the top */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Quay lại
        </button>
        <h1
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "black"
          } `}
        >
          Profile
        </h1>
        <PersonalProfile />
      </div>
      <hr
        className={`${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        }`}
      />

      {/* Content below Info */}
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Sidebar: PersonalIf (1/3) */}
        <div className="w-full md:w-1/4 p-4 border-b md:border-r border-gray-200">
          <PersonalIf />
        </div>

        {/* Main content: PersonalBlog (2/3) */}
        <div className="w-full md:w-3/4 flex-1">
          <div className="mx-auto max-w-4xl py-5">
            <PersonalBlog />
          </div>
        </div>
      </div>

      {/* CreateBlog at the bottom */}
    </div>
  );
};

export default ProfileIf;
