import React from "react";
import useUserBanner from "../../../../../hooks/useUserbanner";

export default function BannerChart() {
  const { userBanner } = useUserBanner();
  const totalCategories = userBanner.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-semibold text-lg">Total Banner</div>
      <div className="text-sm text-gray-600">
        The total number of banner in the system.
      </div>
      <div className="text-4xl font-bold">{totalCategories}</div>
    </div>
  );
}
