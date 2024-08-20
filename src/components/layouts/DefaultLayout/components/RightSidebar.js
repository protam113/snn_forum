import React from "react";
import SActivity from "./noti/SActivity";
import FSuggestion from "./noti/FSuggestion";
import Ads_Input from "../../../design/ads";

const RightSidebar = () => {
  return (
    <div className="w-80 text-white p-4 top-0 right-0 overflow-y-auto hidden md:block">
      <SActivity />
      <hr className="border-zinc-900" />
      <div className="flex flex-col space-y-4 mb-4">
        <p>Ads</p>
        <Ads_Input />
      </div>
      {/* <hr className="border-zinc-900" /> */}
      <div className="flex flex-col space-y-4 mb-4">
        <FSuggestion />
      </div>
    </div>
  );
};

export default RightSidebar;
