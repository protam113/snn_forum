import React from "react";
import RecruitmentSidebar from "./components/RecruitmentSidebar";
import SEO from "../../../components/layouts/DefaultLayout/components/SEO";
import RecruitmentPost from "./components/Recruitment_post";

const Recruitment = () => {
  return (
    <>
      <SEO
        title={"Tuyển Dụng"}
        description={"Details of the blog"}
        name="XLR Team"
        type="article"
      />
      <div className="relative min-h-screen flex">
        <div className="flex-1 overflow-y-auto p-4">
          {/* <hr className={`my-2 border-${theme === "dark" ? "gray-700" : "white"}`} /> */}
          <div className="flex-1 p-4">
            <div className="mx-auto max-w-4xl py-5">
              <RecruitmentPost />
            </div>
          </div>
        </div>
        <RecruitmentSidebar />
      </div>
    </>
  );
};

export default Recruitment;
