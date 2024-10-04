import React from "react";
import PersonalProfile from "./personalProfile";
import PersonalIf from "./PersonalIf";
import PersonalBlog from "./personalBlog";
import { useTheme } from "../../../../context/themeContext";

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

const ProfileIf = () => {
  const { theme } = useTheme();

  return (
    <div>
      <div className={style(theme).wrapper}>
        <PersonalProfile />
        <main className={style(theme).main}>
          <div className={style(theme).content}>
            <PersonalBlog />{" "}
          </div>
          <div className={style(theme).infoContainer}>
            <PersonalIf />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileIf;
