import React from "react";
import RightSidebar from "../../components/layouts/DefaultLayout/components/RightSidebar";
import CreateBlog from "./blog/createBlog";
import Newfeed from "./blog/feed/Newfeed";
import { useTheme } from "../../context/themeContext";
import SEO from "../../components/layouts/DefaultLayout/components/SEO";

const Home = () => {
  const { theme } = useTheme();

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
        <div className="flex-1 overflow-y-auto p-2 ">
          <Newfeed />
        </div>
        <RightSidebar />
        <CreateBlog />
      </div>
    </>
  );
};

export default Home;
