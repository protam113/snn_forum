import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { useTheme } from "../../context/themeContext";

const Notifications = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // Dữ liệu giả cho thông báo
  const notifications = [
    {
      content: "New message received",
      link: "https://www.facebook.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-11T14:38:06.757Z" },
    },
    {
      content: "New comment on your post",
      link: "https://www.twitter.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-10T09:30:00.000Z" },
    },
    {
      content: "Your profile has been updated",
      link: "https://www.linkedin.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-09T17:45:22.000Z" },
    },
    {
      content: "Friend request received",
      link: "https://www.instagram.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-08T12:20:10.000Z" },
    },
    {
      content: "New like on your photo",
      link: "https://www.pinterest.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-07T08:15:05.000Z" },
    },
    {
      content: "Your post was shared",
      link: "https://www.reddit.com/?locale=vi_VN",
      timestamp: { $date: "2024-08-06T14:30:00.000Z" },
    },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const ref = useClickOutside(handleClose);

  return (
    <div className="relative" ref={ref}>
      <button onClick={handleClick} className="relative">
        <FaRegBell
          size={24}
          className={theme === "dark" ? "text-white" : "text-black"}
        />
        {notifications.length > 0 && (
          <span
            className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full ${
              theme === "dark" ? "bg-red-400" : "bg-red-500"
            }`}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-[350px] h-[550px] border border-gray-300 shadow-lg rounded-md flex flex-col ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black"
          }`}
        >
          <ul className="flex-1 overflow-y-auto p-2">
            {notifications.slice(0, visibleCount).map((notification, index) => (
              <li
                key={index}
                className={`p-2 border-b ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <a
                  href={notification.link}
                  className="text-blue-500 hover:underline"
                >
                  {notification.content}
                </a>
                <p className="text-sm">
                  {new Date(notification.timestamp.$date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          {visibleCount < notifications.length && (
            <button
              onClick={handleLoadMore}
              className={`w-full py-2 rounded-b-md ${
                theme === "dark"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Tải thêm
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
