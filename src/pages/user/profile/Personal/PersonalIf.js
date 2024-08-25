import React, { useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLink } from "react-icons/fa";
import Block from "../../../../components/design/Block";
import Loading from "../../../error/load";
import { useTheme } from "../../../../context/themeContext";
import { useParams } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";

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
    <Block className="leading-snug space-y-4">
      <p className="flex items-center text-14 ">
        <FaMapMarkerAlt className="text-custom-red mr-2" />
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
          }`}
        >
          {personalInfo?.location || "No location available"}
        </span>
      </p>
      <p className="flex items-center text-14 ">
        <FaPhoneAlt className="text-custom-red mr-2" />
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
          }`}
        >
          {personalInfo?.phone_number || "No contact available"}
        </span>
      </p>
      <p className="flex items-center text-14 ">
        <FaEnvelope className="text-custom-red mr-2" />
        <span
          className={`font-bold ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Mail :
        </span>
        <span
          className={`ml-2 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {personalInfo?.email || "No email available"}
        </span>
      </p>
      <p className="flex items-center text-14 ">
        <FaLink className="text-custom-red mr-2" />
        <span
          className={`font-bold ${
            theme === "dark" ? "text-zinc-300" : "text-zinc-900"
          }`}
        >
          Web:
        </span>
        <span
          className={`ml-3 ${
            theme === "dark" ? "text-zinc-400" : "text-zinc-800"
          }`}
        >
          {personalInfo?.link || "No link available"}
        </span>
      </p>
    </Block>
  );
};

export default PersonalIf;
