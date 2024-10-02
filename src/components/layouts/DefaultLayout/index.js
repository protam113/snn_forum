import React from "react";
import Nav from "./components/nav";
import Sidebar from "./components/sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        {/* <div className="hidden lg:block lg:w-60 lg:bg-white-900 lg:text-black lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto"> */}
        <div className="h-screen flex flex-col">
          <Sidebar />
        </div>
        {/* </div> */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
