import React, { useEffect, useRef } from "react";
import formatDate from "../../../../../utils/formatDate";
import { useUser } from "../../../../../context/UserProvider";

const GroupMessageList = ({ messages }) => {
  const scroll = useRef();
  const { userInfo: authUser } = useUser();

  // Scroll to the last message when messages change
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sortedMessages = Array.isArray(messages)
    ? [...messages].sort(
        (a, b) => new Date(a.created_date) - new Date(b.created_date)
      )
    : [];

  return (
    <div className="flex-grow overflow-y-auto ">
      {sortedMessages.length > 0 ? (
        sortedMessages.map((message, index) => (
          <div
            key={message.id}
            className={`my-1 flex ${
              message.user.id === authUser?.id ? "justify-end" : "justify-start"
            }`}
          >
            {message.user.id !== authUser?.id && (
              <div className="mr-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={message.user.profile_image}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            <div
              className={`p-3 rounded-md max-w-xs ${
                message.user.id === authUser?.id
                  ? "bg-milk-blue1 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              <strong className="text-14">{message.user.username}:</strong>{" "}
              <hr />
              {message.message}
              <h6 className="text-zinc-400 text-xs font-normal leading-4 py-1">
                {formatDate(message.created_date)}
              </h6>
            </div>

            {message.user.id === authUser?.id && (
              <div className="ml-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={authUser?.profile_image}
                    alt="User profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No messages found.</div>
      )}
      {/* Sử dụng ref để cuộn tới tin nhắn cuối cùng */}
      <div ref={scroll} />
    </div>
  );
};

export default GroupMessageList;
