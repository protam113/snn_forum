import React from "react";
import { Link } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";
import Loading from "../../../error/load";

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
  joinButtonContainer: "mt-1 flex items-center",
  joinedButton:
    "cursor-pointer rounded-full border border-gray-300 px-[1.6rem] py-1 text-center text-sm font-semibold hover:bg-main-blue1 hover:text-white",
};

const Info = () => {
  const { userInfo, loading, error } = useUserInfo();

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
      <div className={style.wrapper}>
        <div className={style.bannerImage}>
          <img
            src={userInfo.profile_bg}
            className="object-cover w-full h-full"
            alt=""
          />
        </div>

        <div>
          <div className={style.bannerContentWrapper}>
            <div className={style.profileInfoWrapper}>
              <div className={style.profilePicWrapper}>
                <img
                  src={userInfo.profile_image}
                  alt="avatar"
                  className={style.profilePic}
                />
              </div>

              <div className={style.titleWrapper}>
                <h1 className={style.title}>
                  {" "}
                  {userInfo?.first_name} {userInfo?.last_name}
                </h1>
                <h2 className={style.tag}> @{userInfo?.username}</h2>
              </div>

              <div className={style.joinButtonContainer}>
                <Link
                  className={style.joinedButton}
                  to={`/profile/${userInfo.id}/edit`}
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
