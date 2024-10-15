import React from "react";
import Sidebar from "./Sidebar";

const ChatD = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default ChatD;
