import React from "react";
import RecruitmentMng from "./RecruitmentMng";
import ManageNav from "./manageNav";

const WorkManage = () => {
  return (
    <div className="banner p-4 rounded-lg shadow-md">
      <ManageNav />
      <hr className="border-zinc-900 my-4" />
      <h5 className="text-20 font-semibold mb-4">Quản lý Tin Tuyển Dụng</h5>
      <RecruitmentMng />
    </div>
  );
};

export default WorkManage;
