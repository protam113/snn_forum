import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../error/load";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useUser } from "../../../../context/UserProvider";
import Follow from "../../../../components/buttons/Follow";

const style = {
  wrapper: "mt-14 flex flex-col select-none",
  bannerImage: "h-52 relative",
  bannerContentWrapper: "mx-auto max-w-5xl px-6 py-2",
  profileInfoWrapper: "flex items-start space-x-4 pb-5",
  profilePicWrapper: `-mt-6 h-20 w-20 relative`,
  profilePic:
    "h-full w-full rounded-full border-2 border-white bg-white bg-cover object-contain",
  titleWrapper: "mt-1 flex items-center space-x-4",
  title: "text-2xl font-bold text-black",
  tag: "pt-1 text-sm text-gray-400",
  followButton:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all",
  followButtonFollowing: "bg-gray-400 hover:bg-gray-600",
  followButtonFollow: "bg-blue-500 hover:bg-blue-700",
};

const PersonalProfile = ({ personalInfo }) => {
  const { userInfo } = useUser();

  return (
    <div className={style.wrapper}>
      <div className={style.bannerImage}>
        <img
          src={personalInfo?.profile_bg}
          className="object-cover w-full h-full"
          alt="Banner background"
        />
      </div>

      <div>
        <div className={style.bannerContentWrapper}>
          <div className={style.profileInfoWrapper}>
            <div className={style.profilePicWrapper}>
              <img
                src={personalInfo?.profile_image}
                alt="Avatar"
                className={style.profilePic}
              />
            </div>

            <div className={style.titleWrapper}>
              <div>
                <h1 className={style.title}>
                  {personalInfo?.first_name} {personalInfo?.last_name}
                </h1>
                <h2 className={style.tag}> @{personalInfo?.username}</h2>
              </div>

              {userInfo && (
                <Follow
                  personId={personalInfo.id}
                  is_followed={personalInfo.is_followed}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
