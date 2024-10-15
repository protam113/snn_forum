import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Notifications = () => {
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
    <Menu as="div" className="relative" ref={ref}>
      <MenuButton as="div" onClick={handleClick} className="relative">
        <FaRegBell size={20} className="text-black" />
      </MenuButton>
      {isOpen && (
        <MenuItems
          as="div"
          className="absolute right-0 mt-2 w-[350px] h-[450px] border border-gray-300 shadow-lg rounded-md flex flex-col bg-white text-black
          "
        >
          {notifications.slice(0, visibleCount).map((notification, index) => (
            <MenuItem as="div">
              {" "}
              <a
                href={notification.link}
                className="text-blue-500 hover:underline"
              >
                {notification.content}
              </a>
              <p className="text-sm">
                {new Date(notification.timestamp.$date).toLocaleString()}
              </p>
            </MenuItem>
          ))}
          {visibleCount < notifications.length && (
            <button
              onClick={handleLoadMore}
              className="w-full py-2 rounded-b-md  bg-blue-500 text-white hover:bg-blue-600
              "
            >
              Tải thêm
            </button>
          )}
        </MenuItems>
      )}
    </Menu>
  );
};

export default Notifications;
