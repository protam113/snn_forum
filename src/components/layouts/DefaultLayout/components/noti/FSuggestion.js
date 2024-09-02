import React, { useEffect } from "react";
import Block from "../../../../design/Block";
import { MdGroups2, MdPerson } from "react-icons/md";
import useUserSearch from "../../../../../hooks/useUserSearch";
import useUserInfo from "../../../../../hooks/useUserInfo";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../context/themeContext";

const FSuggestion = () => {
  const { theme } = useTheme();

  const { results: featuredUsers, loading, error } = useUserSearch();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  const top5Users = featuredUsers.slice(0, 5);

  return (
    <Block
      className={`p-4 rounded-lg mb-6  ${theme.textColor || "text-black"} ${
        theme.backgroundColor || ""
      }`}
    >
      <div className="flex justify-between mb-4">
        <h2
          className={`text-xl font-semibold flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-zinc-800"
          }`}
        >
          <span>Featured User</span>
          <MdGroups2 className="text-blue-500" />
        </h2>
        <a href="/nguoi_dung" className={theme.linkColor || "text-blue-500"}>
          See all
        </a>
      </div>
      <div className="space-y-4">
        {top5Users.length === 0 ? (
          <p
            className={`text-center ${
              theme.textColorSecondary || "text-gray-600"
            }`}
          >
            No users available
          </p>
        ) : (
          top5Users.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center justify-between cursor-pointer ${
                theme.userItemBg || ""
              }`}
              onClick={() => handleProfileClick(user.id)}
            >
              <div className="flex items-center">
                <img
                  src={user.profile_image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />

                <div className="ml-4">
                  <p
                    className={`text-sm  ${
                      theme === "dark" ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    {user.first_name} {user.last_name}
                  </p>
                  <p
                    className={`text-xs ${
                      theme.textColorSecondary || "text-gray-400"
                    }`}
                  >
                    @{user.username}
                  </p>
                </div>
              </div>
              {/* Uncomment and style the button if needed */}
              {/* <button
                className={`px-2 py-1 text-sm rounded ${
                  index === 4
                    ? "bg-gray-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {index === 4 ? "Joined" : "Join"}
              </button> */}
            </div>
          ))
        )}
      </div>
    </Block>
  );
};

export default FSuggestion;
