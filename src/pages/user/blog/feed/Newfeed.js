// src/pages/Newfeed.js
import React from "react";
import Blog from "../blog";

const Newfeed = () => {
  return (
    <div className="flex-1 p-4">
      <div className="mx-auto max-w-4xl py-5">
        <Blog />
      </div>
    </div>
  );
};

export default Newfeed;
