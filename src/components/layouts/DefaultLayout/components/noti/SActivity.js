import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../../../design/Block";
import { FaHotjar } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import formatDate from "../../../../../utils/formatDate";
import { useTheme } from "../../../../../context/themeContext";
import { useBlogList } from "../../../../../hooks/Blog/useBlogs";

const SActivity = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const { data: blogsData } = useBlogList();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const MAX_LENGTH = 20;

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const getRecentBlogs = (blogs) => {
    return blogs
      .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
      .slice(0, 5);
  };

  useEffect(() => {
    if (blogsData) {
      // Kết hợp tất cả các trang
      const combinedBlogs = blogsData.pages.flatMap((page) => page.blogs);
      setAllBlogs(combinedBlogs);
    }
  }, [blogsData]);

  // Lấy 5 bài viết gần đây từ dữ liệu đã fetch
  const recentActivities = getRecentBlogs(allBlogs);

  return (
    <Block className="p-4 border-zinc-300 rounded-lg mb-6">
      <div className="flex justify-between mb-4">
        <h2
          className={`text-xl font-semibold flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-zinc-800"
          }`}
        >
          <span>New</span>
          <FaHotjar className="text-red-500" />
        </h2>
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
