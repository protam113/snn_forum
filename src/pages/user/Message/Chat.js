import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useUser } from "../../../context/UserProvider";
import useUserSearch from "../../../hooks/useUserSearch";
import { useChat } from "../../../hooks/Chat/useChat";
import { BiPaperPlane, BiSearch } from "react-icons/bi";
import Loading from "../../error/load";
import formatDate from "../../../utils/formatDate";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";

const Chat = () => {
  const { getToken } = useAuth();
  const { userInfo } = useUser(); // Lấy thông tin người dùng hiện tại
  const { results: users, loading, fetchUsers } = useUserSearch();
  const [personId, setPersonId] = useState(null);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const wsURL = process.env.REACT_APP_WsBASE_URL;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChat(personId);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetchingNextPage
      )
        return;
      if (hasNextPage) fetchNextPage();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (personId) {
      const token = getToken();
      const socketConnection = new WebSocket(
        `${wsURL}/ws/chat/personal/${personId}/?token=${token}`
      );

      socketConnection.onopen = () => {
        console.error("WebSocket connected");
      };

      socketConnection.onmessage = (event) => {
        console.error("Message from server:", event.data);
      };

      socketConnection.onclose = () => {
        console.error("WebSocket disconnected");
      };

      socketConnection.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setSocket(socketConnection);

      return () => {
        socketConnection.close();
      };
    }
  }, [personId, wsURL, getToken]);

  const handleSendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        recipient: personId,
        message: message,
      };
      socket.send(JSON.stringify(messageData));
      setMessage("");
    } else {
      console.warn("WebSocket is not open. Ready state:", socket.readyState);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Danh sách người dùng */}
      <div className="w-80 h-screen p-2 hidden md:block">
        <div className="h-full overflow-y-auto">
          <div className="text-xl font-extrabold text-gray-600 p-3">
            Nhắn tin
          </div>
          <Link
            to="/group"
            className="text-xl font-extrabold text-gray-600 p-3"
          >
            Group
          </Link>
          <div className="search-chat flex p-3">
            <input
              className="input text-gray-700 text-sm p-3 focus:outline-none bg-gray-200 w-full rounded-l-md"
              type="text"
              placeholder="Search Messages"
            />
            <div className="bg-gray-200 flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
              <BiSearch className="h-6 w-5" />
            </div>
          </div>

          <div className="text-16 font-bold text-gray-600 p-3">Gợi ý</div>
          <div className="p-1">
            {loading ? (
              <Loading />
            ) : (
              <div className="space-y-2">
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center p-2 cursor-pointer hover:bg-milk-blue1"
                      onClick={() => setPersonId(user.id)}
                    >
                      <div className="w-7 h-7 m-1">
                        <img
                          className="rounded-full"
                          src={user.profile_image}
                          alt="avatar"
                        />
                      </div>
                      <div className="p-2 rounded cursor-pointer">
                        {user.username}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No users found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phần nhắn tin */}
      <div className="flex-grow h-full flex flex-col">
        {/* Phần tiêu đề người dùng */}
        <div className="w-full h-15 p-1 bg-main-blue2 shadow-md rounded-xl rounded-bl-none rounded-br-none">
          <div className="flex p-2 align-middle items-center">
            {personId && (
              <div className="border rounded-full border-white p-1">
                <img
                  className="rounded-full h-8 w-8"
                  src={
                    users.find((user) => user.id === personId)?.profile_image
                  }
                  alt="avatar"
                />
              </div>
            )}
            <div className="flex-grow p-2">
              <div className="text-md text-gray-50 font-semibold">
                {users.find((user) => user.id === personId)?.username ||
                  "Select a user"}
              </div>
            </div>
          </div>
        </div>

        {/* Phần hiển thị tin nhắn */}
        <div className="flex-grow overflow-y-auto">
          {data?.pages?.length > 0 ? (
            data.pages.map((page) =>
              page.recruitments.map((chat) => (
                <div
                  key={chat.id}
                  className={`my-1 flex ${
                    chat.user.id === userInfo.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {chat.user.id !== userInfo.id ? (
                    <div className="p-2 rounded-md bg-gray-200">
                      <strong>{chat.user.username}:</strong> {chat.message}
                      <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                        {formatDate(chat.created_date)}
                      </h6>
                    </div>
                  ) : (
                    <div className="p-2 rounded-md bg-main-blue1 text-white">
                      <strong>{chat.user.username}:</strong> {chat.message}
                      <h6 className="text-gray-300 text-xs font-normal leading-4 py-1">
                        {formatDate(chat.created_date)}
                      </h6>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            <div>No messages found.</div>
          )}
          {isFetchingNextPage && <p>Loading more messages...</p>}
        </div>

        {/* Phần nhập tin nhắn */}
        {personId ? (
          <div className="w-full pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
            <div className="flex flex-grow items-center">
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message ..."
                className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  className="items-center flex px-3 py-2 bg-main-blue2 rounded-full shadow"
                  onClick={handleSendMessage}
                >
                  <BiPaperPlane className="h-5 w-5 text-white" />
                  <h3 className="text-white text-xs font-semibold leading-4 px-2">
                    Send
                  </h3>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white text-black">
            <AiOutlineMessage size={48} className="mb-4" />
            <p className="text-3xl">Chọn một tin nhắn để xem chi tiết</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
