import React from "react";
import CreateBlog from "./blog/createBlog";
import About from "./profile/MyProfile/about";
import { useTheme } from "../../context/themeContext";
import Info from "./profile/MyProfile/info";
import Userblogs from "./profile/MyProfile/UserPosts";

const style = (theme) => ({
  wrapper: `flex min-h-screen flex-col ${
    theme === "dark"
      ? "border-custom-zinc bg-zinc-700"
      : "border-gray-300 bg-white"
  }`,
  main: `mx-auto flex w-full max-w-5xl flex-1 space-x-6 py-5 px-6`,
  content: `w-full space-y-4 lg:w-2/3`,
  infoContainer: `hidden w-1/3 lg:block`,
});

const Profile = () => {
  const { theme } = useTheme();

  return (
    <div>
      <div className={style(theme).wrapper}>
        <Info />
        <main className={style(theme).main}>
          <div className={style(theme).content}>
            <Userblogs />
          </div>
          <div className={style(theme).infoContainer}>
            <About />
          </div>
        </main>
      </div>
      <CreateBlog />
    </div>
  );
};

export default Profile;
