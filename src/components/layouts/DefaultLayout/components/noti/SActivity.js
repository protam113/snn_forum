import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Block from "../../../../design/Block";
import { FaHotjar } from "react-icons/fa";
import useBlog from "../../../../../hooks/useBlog";
import formatDate from "../../../../../utils/formatDate";
import { useTheme } from "../../../../../context/themeContext";

const SActivity = () => {
  const { blogs, loading, error } = useBlog();
  const { theme } = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate

  const MAX_LENGTH = 20;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading activities</p>;

  const recentActivities = blogs.slice(0, 5);

  return (
    <Block className="p-1 border-zinc-300 rounded-lg mb-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <span
            className={`${theme === "dark" ? "text-white" : "text-zinc-800"}`}
          >
            Hot
          </span>
          <FaHotjar className="text-red-500" />
        </h2>
        <a href="/" className="text-blue-500">
          See all
        </a>
      </div>
      <div className="space-y-5">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-zinc-300 pb-2 mb-2 cursor-pointer" // Add cursor-pointer class
            onClick={() => handleBlogClick(activity.id)} // Handle blog click
          >
            <div className="flex items-center">
              <img
                src={activity.user.profile_image || "default-profile.png"}
                alt={activity.user.username}
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-4">
                <p
                  className={`text-14 ${
                    theme === "dark" ? "text-white" : "text-zinc-800"
                  }`}
                >
                  {activity.user.username}
                </p>
                <p
                  className={`text-14 font-semibold ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-800"
                  } truncated-text`}
                >
                  {truncateText(activity.content, MAX_LENGTH)}{" "}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {formatDate(activity.created_date)}
            </span>
          </div>
        ))}
      </div>
    </Block>
  );
};

export default SActivity;
