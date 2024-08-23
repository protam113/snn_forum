import React from "react";
import Navbar from "../DefaultLayout/components/nav";
import AdSidebar from "./components/AdSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-1">
        <AdSidebar />
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
