import React from "react";
// import Sidebar from "../../sidebar";
const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      {/* <Sidebar /> */}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default DefaultLayout;
