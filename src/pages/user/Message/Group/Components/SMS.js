import React from "react";
import Loading from "../../../../error/load";
import useGetGroupMessages from "../../../../../hooks/GroupChat/useGetGroupMessages";
import { usePersonContext } from "../../../../../context/PersonContext";
import GroupMessageList from "./MessageList";

const ChatGroupMessages = () => {
  const { selectedGroup } = usePersonContext(); // Lấy selectedUser từ context
  const { messages, isLoading, isError } = useGetGroupMessages(
    selectedGroup?.id
  ); // Gọi useGetMessages

  if (isLoading) {
    return <Loading />; // Component hiển thị khi đang tải
  }

  if (isError) {
    return <div className="text-red-500">Có lỗi xảy ra khi lấy tin nhắn.</div>;
  }

  return (
    <div className="px-4 flex-1 overflow-auto">
      {Array.isArray(messages) && messages.length > 0 ? (
        <GroupMessageList messages={messages} />
      ) : (
        <p>Chưa có tin nhắn!</p>
      )}
    </div>
  );
};

export default ChatGroupMessages;
