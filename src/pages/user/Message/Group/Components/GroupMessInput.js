import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { usePersonContext } from "../../../../../context/PersonContext";
import useAuth from "../../../../../hooks/useAuth";

const GroupMessInput = ({ setMessages }) => {
  const [message, setMessage] = useState("");
  const { selectedGroup } = usePersonContext();
  const wsURL = process.env.REACT_APP_WsBASE_URL;
  const { getToken } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!selectedGroup) return;

    const token = getToken();
    const newSocket = new WebSocket(
      `${wsURL}/ws/chat/${selectedGroup.id}/?token=${token}`
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [selectedGroup, getToken]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        recipient: selectedGroup.id,
        message: message,
      };
      socket.send(JSON.stringify(messageData));
      setMessage(""); // Clear input after sending
    } else {
      console.warn("WebSocket is not open. Ready state:", socket.readyState);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Gửi tin nhắn..."
          className="border text-sm rounded-lg block w-full p-3 border-main-blue2 bg-white text-black"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default GroupMessInput;
