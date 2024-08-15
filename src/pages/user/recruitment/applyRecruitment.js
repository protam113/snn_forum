import React from "react";
import useRecruitment from "../../../hooks/useRecruitment";
import { useParams } from "react-router-dom";

const ApplyRecruitment = () => {
  // const { id: postId } = useParams();
  const { recruitment, loading, error, addApplyJob } = useRecruitment();
  return (
    <div>
      <h1>Apply</h1>
    </div>
  );
};

export default ApplyRecruitment;
