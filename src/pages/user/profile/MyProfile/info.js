import React from "react";
import Block from "../../../../components/design/Block";
import { Link } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";
import Loading from "../../../error/load";
import { useTheme } from "../../../../context/themeContext";

const Info = () => {
  const { userInfo, loading, error } = useUserInfo();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  return (
    <>
      <Block className="relative col-span-12 row-span-2 md:col-span-6">
        <div
          className="h-72 bg-cover bg-center rounded-t-xl"
          style={{
            backgroundImage: `url(${userInfo?.profile_bg || "default-bg.jpg"})`,
          }}
        ></div>

        <div className="absolute left-4 flex items-center p-4 ">
          <img
            src={userInfo?.profile_image || "default-avatar.jpg"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-800"
          />
          <div className="ml-4">
            <h1
              className={`text-2xl font-semibold ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {userInfo?.first_name} {userInfo?.last_name}
              <br />
              <span className="text-gray-500 text-lg">
                @{userInfo?.username}
              </span>
            </h1>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 gap-4">
          <Link
            to={`/profile/${userInfo.username}/edit`}
            className="flex items-center text-sm justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            Edit Profile
          </Link>
          <a
            href="/"
            className="flex items-center text-sm justify-center py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Archive
          </a>
        </div>
      </Block>
      <hr
        className={`mt-4 ${
          theme === "dark" ? "border-zinc-800" : "border-white"
        }`}
      />
      <Block className="">
        <p>
          <span className="text-custom-red text-16 font-bold">Bio: </span>
          <br />
          <span
            className={`text-16 font-medium ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {userInfo?.about || "No bio available"}
          </span>
        </p>
      </Block>
    </>
  );
};

export default Info;
