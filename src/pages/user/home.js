import React from "react";
import RightSidebar from "../../components/layouts/DefaultLayout/components/RightSidebar";
import CreateBlog from "./blog/createBlog";
import Newfeed from "./blog/feed/Newfeed";
import { useTheme } from "../../context/themeContext";
import useAuth from "../../hooks/useAuth";
import { WebMaintenance } from "../error/error";
import SEO from "../../components/layouts/DefaultLayout/components/SEO";

const Home = () => {
  const { theme } = useTheme();
  const { setAuth } = useAuth();

  return (
    <>
      <SEO
        title={"Trang Chủ"}
        description={"Details of the blog"}
        name="XLR Team"
        type="article"
      />
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
            Bài <span className="text-custom-red">Viết</span>
          </h1>
          <Newfeed />
        </div>
        <RightSidebar />
        <CreateBlog />
      </div>
    </>
  );
};

export default Home;
