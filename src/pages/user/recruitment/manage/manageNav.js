import React from "react";
import Manage from "./manage";
import { Link } from "react-router-dom";

const ManageNav = () => {
  return (
    <div>
      <br />
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Link
          className="flex items-center text-sm justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
          to="/manage"
        >
          Quản Lý Tuyển Dụng
        </Link>
        <Link
          className="flex items-center text-sm justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
          to="/work_manage"
        >
          Quản Lý Công Việc
        </Link>
      </div>
    </div>
  );
};

export default ManageNav;
