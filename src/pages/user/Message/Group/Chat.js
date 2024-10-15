import React from "react";
import GroupSidebar from "./Sidebar";

const GroupChat = ({ children }) => {
  return (
    <div className="flex">
      <GroupSidebar />
      {children}
    </div>
  );
};

export default GroupChat;
