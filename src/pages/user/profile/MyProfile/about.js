import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLink } from "react-icons/fa";
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
    <Block className="leading-snug space-y-4 p-4 rounded-lg  max-w-xs">
      <div className="flex items-start text-14 md:text-14">
        <FaMapMarkerAlt className="text-custom-red mr-2 mt-1" />
        <div>
          <span
            className={`font-bold ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-900"
            }`}
          >
            Location:
          </span>
          <span
            className={`ml-2 ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-800"
            } break-words`}
          >
            {userInfo?.location || "No location available"}
          </span>
        </div>
      </div>
      <div className="flex items-start text-14 md:text-14">
        <FaPhoneAlt className="text-custom-red mr-2 mt-1" />
        <div>
          <span
            className={`font-bold ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-900"
            }`}
          >
            Phone Contact:
          </span>
          <span
            className={`ml-2 ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-800"
            } break-words`}
          >
            {userInfo?.phone_number || "No contact available"}
          </span>
        </div>
      </div>
      <div className="flex items-start text-14 md:text-14">
        <FaEnvelope className="text-custom-red mr-2 mt-1" />
        <div>
          <span
            className={`font-bold ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-900"
            }`}
          >
            Mail Contact:
          </span>
          <span
            className={`ml-2 ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-800"
            } break-words`}
          >
            {userInfo?.email || "No email available"}
          </span>
        </div>
      </div>
      <div className="flex items-start text-14 md:text-14">
        <FaLink className="text-custom-red mr-2 mt-1" />
        <div>
          <span
            className={`font-bold ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-900"
            }`}
          >
            Web:
          </span>
          <a
            href={
              userInfo?.link?.startsWith("http://") ||
              userInfo?.link?.startsWith("https://")
                ? userInfo?.link
                : `https://${userInfo?.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-2 border-b border-transparent ${
              theme === "dark"
                ? "text-blue-500 hover:text-blue-400"
                : "text-blue-600 hover:text-blue-500"
            } transition-all duration-300 break-words`}
          >
            {userInfo?.link || "No link available"}
          </a>
        </div>
      </div>
    </Block>
  );
};

export default About;
