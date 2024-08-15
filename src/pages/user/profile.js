import React, { useState } from "react";
import CreateBlog from "./blog/createBlog";
import About from "./profile/MyProfile/about";
import { useTheme } from "../../context/themeContext";
import Info from "./profile/MyProfile/info";
import Userblogs from "./profile/MyProfile/UserPosts";
import { FaProductHunt, FaUserSecret } from "react-icons/fa";
import { BsJournalBookmark } from "react-icons/bs";
// import Products from "./profile/MyProfile/Products"; // Thêm import cho trang Sản phẩm
// import Jobs from "./profile/MyProfile/Jobs"; // Thêm import cho trang Tuyển dụng

const Profile = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("userblogs");

  const renderContent = () => {
    switch (activeTab) {
      case "userblogs":
        return <Userblogs />;
      case "products":
        return <FaProductHunt />;
      case "jobs":
        return <BsJournalBookmark />;
      default:
        return <FaUserSecret />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Info at the top */}
      <div className="p-4">
        <Info />
      </div>
      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Profile
      </h1>
      <hr
        className={`${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        }`}
      />
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Sidebar: About (1/4) */}
        <div className="w-full md:w-1/4 p-4 border-b md:border-r border-gray-200">
          <About />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 flex-1">
          {/* Navigation Links */}
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("userblogs")}
              className={`text-lg font-medium px-4 py-2 rounded ${
                activeTab === "userblogs"
                  ? "bg-custom-red text-white"
                  : "bg-white text-black"
              } hover:bg-red-400 hover:text-white ${
                theme === "dark" ? "hover:bg-red-600" : ""
              }`}
            >
              Bài Viết
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`text-lg font-medium px-4 py-2 rounded ${
                activeTab === "products"
                  ? "bg-custom-red text-white"
                  : "bg-white text-black"
              } hover:bg-red-400 hover:text-white ${
                theme === "dark" ? "hover:bg-red-600" : ""
              }`}
            >
              Sản Phẩm
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`text-lg font-medium px-4 py-2 rounded ${
                activeTab === "jobs"
                  ? "bg-custom-red text-white"
                  : "bg-white text-black"
              } hover:bg-red-400 hover:text-white ${
                theme === "dark" ? "hover:bg-red-600" : ""
              }`}
            >
              Việc Làm
            </button>
          </div>

          {/* Render Content based on activeTab */}
          <div className="mx-auto max-w-4xl py-5">{renderContent()}</div>
        </div>
      </div>

      {/* CreateBlog at the bottom */}
      <CreateBlog />
    </div>
  );
};

export default Profile;
