import React from "react";
import { useParams } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import Profile from "./profile";
import ProfileIf from "./profile/Personal/ProfileIf";

const ProfileMain = () => {
  const { id } = useParams(); // personId from URL
  const { userInfo, loading, error } = useUserInfo();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isCurrentUser = userInfo && userInfo.id.toString() === id;

  return isCurrentUser ? <Profile /> : <ProfileIf />;
};

export default ProfileMain;
