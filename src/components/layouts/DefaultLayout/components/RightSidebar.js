import React from "react";
import SActivity from "./noti/SActivity";
import FSuggestion from "./noti/FSuggestion";

const RightSidebar = () => {
  return (
    <div className="w-80 text-white p-4 top-0 right-0 overflow-y-auto hidden md:block">
      <SActivity />
      <div className="flex flex-col space-y-4 mb-4">
        <FSuggestion />
      </div>
    </div>
  );
};

export default RightSidebar;
