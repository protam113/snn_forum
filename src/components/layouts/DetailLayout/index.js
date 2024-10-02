import { Nav } from "hero-slider";
import React from "react";

const DetailLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex flex-1">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default DetailLayout;
