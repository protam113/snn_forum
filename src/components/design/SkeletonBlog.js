import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonBlog = () => {
  return (
    <div className="p-4 rounded-lg border mt-4 bg-white shadow-sm">
      <div className="flex items-center mb-4">
        <Skeleton circle height={50} width={50} />
        <div className="ml-2">
          <Skeleton height={20} width={120} />
          <Skeleton height={15} width={80} />
        </div>
      </div>
      <Skeleton height={20} width="100%" />
      <Skeleton height={20} width="90%" />
      <Skeleton height={20} width="95%" />
      <div className="flex gap-4 mt-4">
        <Skeleton height={150} width={150} />
        <Skeleton height={150} width={150} />
        <Skeleton height={150} width={150} />
      </div>
      <Skeleton height={20} width="60%" className="mt-4" />
      <Skeleton height={20} width="100%" className="mt-4" />
    </div>
  );
};

export default SkeletonBlog;
