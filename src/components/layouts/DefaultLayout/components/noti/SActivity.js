import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../../design/Block";
import { FaHotjar } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import useBlog from "../../../../../hooks/useBlog";
import formatDate from "../../../../../utils/formatDate";
import { useTheme } from "../../../../../context/themeContext";
import Loading from "../../../../../pages/error/load";

const SActivity = () => {
  const { blogs, loading, error, fetchBlogs } = useBlog();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const MAX_LENGTH = 20;

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500">Error loading activities</p>;

  const recentActivities = blogs.slice(0, 5);

  return (
    <Block className="p-4 border-zinc-300 rounded-lg mb-6">
      <div className="flex justify-between mb-4">
        <h2
          className={`text-xl font-semibold flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-zinc-800"
          }`}
        >
          <span>Hot</span>
          <FaHotjar className="text-red-500" />
        </h2>
        <a href="/" className="text-blue-500">
          See all
        </a>
      </div>
      <div className="space-y-5">
        {recentActivities.length === 0 ? (
          <p className="text-center text-gray-600">No recent activities</p>
        ) : (
          recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b border-zinc-300 pb-2 mb-2 cursor-pointer"
              onClick={() => handleBlogClick(activity.id)}
            >
              <div className="flex items-center">
                {activity.user.profile_image ? (
                  <img
                    src={activity.user.profile_image}
                    alt={activity.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <MdPerson className="w-8 h-8 text-gray-500" />
                )}
                <div className="ml-4">
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-white" : "text-zinc-800"
                    }`}
                  >
                    {activity.user.username}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-800"
                    }`}
                  >
                    {truncateText(activity.content, MAX_LENGTH)}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(activity.created_date)}
              </span>
            </div>
          ))
        )}
      </div>
    </Block>
  );
};

export default SActivity;
