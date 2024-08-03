import React from "react";
import Recruitment_post from "./Recruitment_post";

const Recruitment_feed = () => {
  return (
    <div className="flex-1 p-4">
      <div className="mx-auto max-w-4xl py-5">
        <Recruitment_post />
      </div>
      <div className="mx-auto max-w-4xl py-5">
        <Recruitment_post />
      </div>
    </div>
  );
};

export default Recruitment_feed;
