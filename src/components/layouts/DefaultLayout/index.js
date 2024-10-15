import React from "react";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="flex">
        <div className="lg:w-60 lg:p-4">
          <Sidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
