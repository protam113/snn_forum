import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLink } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import Block from "../../../../components/design/Block";
import useUserInfo from "../../../../hooks/useUserInfo";
import Loading from "../../../error/load";
import { useTheme } from "../../../../context/themeContext";

const About = () => {
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
    <Block className="leading-snug space-y-4">
      <p className="flex items-center ">
        <FaMapMarkerAlt className="text-custom-red mr-2" />
        <span
          className={`font-bold text-14  ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Location:
        </span>
        <span
          className={`ml-2 text-14  ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {userInfo?.location || "No location available"}
        </span>
      </p>
      <p className="flex items-center ">
        <FaPhoneAlt className="text-custom-red mr-2" />
        <span
          className={`font-bold text-14  ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Phone Contact:
        </span>
        <span
          className={`ml-2 text-14  ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {userInfo?.phone_number || "No contact available"}
        </span>
      </p>
      <p className="flex items-center ">
        <FaEnvelope className="text-custom-red mr-2" />
        <span
          className={`font-bold text-14  ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Mail Contact:
        </span>
        <span
          className={`ml-2 text-14  ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {userInfo?.email || "No email available"}
        </span>
      </p>
      <p className="flex items-center">
        <FaLink className="text-custom-red mr-2" />
        <span
          className={`font-bold text-14 ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Web:
        </span>
        <CiLink />
        <a
          href={
            userInfo?.link?.startsWith("http://") ||
            userInfo?.link?.startsWith("https://")
              ? userInfo?.link
              : `https://${userInfo?.link}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-2 text-14 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {userInfo?.link || "No link available"}
        </a>
      </p>
    </Block>
  );
};

export default About;
