import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Block from "../../../../components/design/Block";
import Loading from "../../../error/load";
import usePersonalInfo from "../../../../hooks/usePersonalInfo";
import { useTheme } from "../../../../context/themeContext";

const PersonalProfile = () => {
  const { theme } = useTheme();
  const { personalInfo, loading, error, setUserId } = usePersonalInfo();
  const { id: userId } = useParams();

  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <hr
        className={`my-4 ${
          theme === "dark" ? "border-gray-600" : "border-white"
        }`}
      />
      <Block className="col-span-8 row-span-2 md:col-span-6 relative">
        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              personalInfo?.profile_bg || "default-bg.jpg"
            })`,
          }}
        ></div>

        <div className="absolute top-52 flex items-center">
          <div className="flex-shrink-0">
            <img
              src={personalInfo?.profile_image || "default-avatar.jpg"}
              alt="avatar"
              className="w-24 h-24 rounded-2xl border-2 border-gray-800"
            />
          </div>
          <div className="ml-4">
            <h1
              className={`text-20  ${
                theme === "dark" ? "text-white" : "text-black"
              }  font-medium leading-tight`}
            >
              {personalInfo?.first_name} {personalInfo?.last_name}
              <br />
              <span className="text-zinc-400 text-16">
                @{personalInfo?.username}
              </span>
            </h1>
          </div>
        </div>
      </Block>
      <div className="mt-32 grid grid-cols-2 gap-4"></div>
      <Block className="col-span-12 text-xl leading-snug">
        <p>
          <span className="text-20 font-bold text-custom-red">Về tôi: </span>
          <br />
          <span
            className={` ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-800"
            } text-16`}
          >
            {personalInfo?.about || "Không có thông tin về tôi"}
          </span>
        </p>
      </Block>
    </>
  );
};

export default PersonalProfile;
