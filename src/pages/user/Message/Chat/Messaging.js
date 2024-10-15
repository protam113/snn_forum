import React, { useEffect, useState } from "react";
import ChatD from "./Chat";
import { useUser } from "../../../../context/UserProvider";
import useUserInfo from "../../../../hooks/useUserInfo";
import Loading from "../../../error/load";
import { usePersonContext } from "../../../../context/PersonContext";
import useGetMessages from "../../../../hooks/Message/useGetMessages";
import MessageList from "./Components/MessageList";
import MessInput from "./Components/MessInput";

const Messaging = () => {
  const { selectedUser } = usePersonContext();
  const { userInfo } = useUser();
  const { personalInfo, loading, error } = useUserInfo(selectedUser?.id);
  const [page, setPage] = useState(1); // State for current page
  const { messages: fetchedMessages, isLoading } = useGetMessages(
    selectedUser?.id,
    page
  );

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (fetchedMessages) {
      setMessages((prevMessages) => [...fetchedMessages, ...prevMessages]); // Append new messages
    }
  }, [fetchedMessages]);

  if (loading || isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error?.message || "Có lỗi xảy ra khi lấy tin nhắn."}
      </div>
    );
  }

  const loadMoreMessages = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for loading more messages
  };

  return (
    <ChatD>
      <div className="w-full flex flex-col h-screen">
        {" "}
        {/* Set height to full screen */}
        {selectedUser ? (
          <>
            <div className="flex gap-2 items-center bg-main-blue1 text-white px-4 py-2 mb-2">
              <div className="w-12 rounded-full">
                <img
                  src={personalInfo?.profile_image}
                  alt="user-profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 font-bold text-1">
                <p>{personalInfo?.username}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[calc(80vh-200px)] bg-zinc-100">
              {" "}
              {/* Limit height for messages */}
              <MessageList messages={messages} />
            </div>
            <button
              onClick={loadMoreMessages}
              className="p-2 bg-blue-500 text-white rounded mt-2"
            >
              Tải thêm tin nhắn
            </button>
            <div className="p-4 bg-white border-t">
              <MessInput messages={messages} setMessages={setMessages} />
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-4xl text-black font-bold">
              Hi, {userInfo?.username}
            </h1>
            <h1 className="text-2xl text-black">Let's start conversation</h1>
          </div>
        )}
      </div>
    </ChatD>
  );
};

export default Messaging;
