import React from "react";
import { useParams } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import Profile from "./profile";
import ProfileIf from "./profile/Personal/ProfileIf";
import Loading from "../error/load";

const ProfileMain = () => {
  const { id } = useParams();
  const { userInfo, loading, error } = useUserInfo();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const isCurrentUser = userInfo && userInfo.id.toString() === id;

  return isCurrentUser ? <Profile /> : <ProfileIf />;
};

export default ProfileMain;
