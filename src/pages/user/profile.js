import React from "react";
import CreateBlog from "./blog/createBlog";
import About from "./profile/MyProfile/about";
import { useTheme } from "../../context/themeContext";
import Info from "./profile/MyProfile/info";
import Userblogs from "./profile/MyProfile/UserPosts";

const Profile = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Info at the top */}
      <div className="p-4">
        <Info />
      </div>
      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "black"
        } `}
      >
        Profile
      </h1>
      <hr
        className={` ${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        }`}
      />
      {/* Content below Info */}
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Sidebar: About (1/3) */}
        <div className="w-full md:w-1/4 p-4 border-b md:border-r border-gray-200">
          <About />
        </div>

        {/* Main content: Userblogs (2/3) */}
        <div className="w-full md:w-3/4 flex-1">
          <div className="mx-auto max-w-4xl py-5">
            <Userblogs />
          </div>
        </div>
      </div>

      {/* CreateBlog at the bottom */}
      <CreateBlog />
    </div>
  );
};

export default Profile;
