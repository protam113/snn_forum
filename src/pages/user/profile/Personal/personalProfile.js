import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../error/load";
import { useTheme } from "../../../../context/themeContext";
import useUserInfo from "../../../../hooks/useUserInfo";

const style = {
  wrapper: "mt-14 flex flex-col select-none",
  bannerImage: "h-52 relative",
  bannerContentWrapper: "mx-auto max-w-5xl px-6 py-2",
  profileInfoWrapper: "flex items-start space-x-4 pb-5",
  profilePicWrapper: `-mt-6 h-20 w-20 relative`,
  profilePic:
    "h-full w-full rounded-full border-2 border-white bg-white bg-cover object-contain",
  titleWrapper: "mt-1",
  title: "text-2xl font-bold text-black",
  tag: "pt-1 text-sm text-gray-400",
};

const PersonalProfile = () => {
  const { id: personId } = useParams();
  const { personalInfo, loading, error } = useUserInfo(personId);

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

  // Check if the current user is the same as the personalInfo user

  return (
    <div className={style.wrapper}>
      <div className={style.bannerImage}>
        <img
          src={personalInfo?.profile_bg}
          className="object-cover w-full h-full"
          alt=""
        />
      </div>

      <div>
        <div className={style.bannerContentWrapper}>
          <div className={style.profileInfoWrapper}>
            <div className={style.profilePicWrapper}>
              <img
                src={personalInfo?.profile_image}
                alt="avatar"
                className={style.profilePic}
              />
            </div>

            <div className={style.titleWrapper}>
              <h1 className={style.title}>
                {" "}
                {personalInfo?.first_name} {personalInfo?.last_name}
              </h1>
              <h2 className={style.tag}> @{personalInfo?.username}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
