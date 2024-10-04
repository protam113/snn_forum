import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLink } from "react-icons/fa";
import Loading from "../../../error/load";
import { useTheme } from "../../../../context/themeContext";
import { useParams } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";

const style = {
  wrapper:
    "flex flex-col space-y-4 divide-y divide-[#343536] rounded border p-4 text-black select-none",
  profileInfoContainer: "flex items-center space-x-4",
  profilePicContainer: "relative h-16 w-16",
  profilePic: "object-cover rounded-full border-2 border-gray-300 shadow-lg",
  aboutContent: "py-2 text-sm text-gray-700",
  statsWrapper: "flex items-center space-x-4 text-gray-600",
  stat: "flex flex-col",
  statTitle: "text-xs font-semibold",
  footer: "flex items-center space-x-2 pt-2 text-sm text-gray-600",
  joinedButton:
    "cursor-pointer rounded-full border border-gray-300 py-1 text-center text-sm font-semibold",
};
const PersonalIf = () => {
  const { id: personId } = useParams();
  const { theme } = useTheme();
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

  return (
    <div className={style.wrapper}>
      <div className={style.profileInfoContainer}>
        <div className={style.profilePicContainer}>
          <img
            src={personalInfo?.profile_image}
            alt="avatar"
            className={style.profilePic}
          />
        </div>
        <div>
          <p className="font-bold text-lg">@{personalInfo?.username}</p>
          <p className={style.aboutContent}>
            {personalInfo?.about || "No information available"}
          </p>
        </div>
      </div>

      <div className="py-2">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className={style.footer}>
          <FaMapMarkerAlt />
          <p>Location: {personalInfo?.location || "No location available"}</p>
        </div>
        <div className={style.footer}>
          <FaPhoneAlt />
          <p>Phone: {personalInfo?.phone_number || "No contact available"}</p>
        </div>
        <div className={style.footer}>
          <FaEnvelope />
          <p>Email: {personalInfo?.email || "No email available"}</p>
        </div>
        <div className={style.footer}>
          <FaLink />
          <p>
            Link:{" "}
            <a
              href={
                personalInfo?.link?.startsWith("http://") ||
                personalInfo?.link?.startsWith("https://")
                  ? personalInfo?.link
                  : `https://${personalInfo?.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 ${
                theme === "dark"
                  ? "text-blue-500 hover:text-blue-400"
                  : "text-blue-600 hover:text-blue-500"
              } transition-all duration-300`}
            >
              {personalInfo?.link || "No link available"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalIf;
