import React from "react";
import { MdInfoOutline } from "react-icons/md";

const User = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <MdInfoOutline className="mx-auto text-6xl text-gray-500 mb-4" />
        <p className="text-xl text-gray-700">Not available yet</p>
      </div>
    </div>
  );
};

export default User;
