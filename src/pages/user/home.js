import React from "react";
import RightSidebar from "../../components/layouts/DefaultLayout/components/RightSidebar";
import CreateBlog from "./blog/createBlog";
import Newfeed from "./blog/feed/Newfeed";
import { useTheme } from "../../context/themeContext";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { theme } = useTheme();
  const { setAuth } = useAuth();

  return (
    <div
      className={`relative min-h-screen flex ${
        theme === "dark" ? " text-white" : " text-black"
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <hr
          className={`my-4 ${
            theme === "dark" ? "border-zinc-800" : "border-white"
          }`}
        />
        <h1 className="font-bold text-24">
          New <span className="text-custom-red">Feed</span>
        </h1>
        <Newfeed />
      </div>
      <RightSidebar />
      <CreateBlog />
    </div>
  );
};

export default Home;
