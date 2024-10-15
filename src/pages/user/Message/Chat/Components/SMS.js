import React from "react";
import { usePersonContext } from "../../../../../context/PersonContext";
import useGetMessages from "../../../../../hooks/Message/useGetMessages";
import Loading from "../../../../error/load";
import MessageList from "./MessageList";

const ChatMessages = () => {
  const { selectedUser } = usePersonContext(); // Lấy selectedUser từ context
  const { messages, isLoading, isError } = useGetMessages(selectedUser?.id); // Gọi useGetMessages

  if (isLoading) {
    return <Loading />; // Component hiển thị khi đang tải
  }

  if (isError) {
    return <div className="text-red-500">Có lỗi xảy ra khi lấy tin nhắn.</div>;
  }

  return (
    <div className="px-4 flex-1 overflow-auto">
      {Array.isArray(messages) && messages.length > 0 ? (
        <MessageList messages={messages} />
      ) : (
        <p>Chưa có tin nhắn!</p>
      )}
    </div>
  );
};

export default ChatMessages;
