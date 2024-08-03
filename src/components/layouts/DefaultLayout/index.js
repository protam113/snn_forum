import React from "react";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
