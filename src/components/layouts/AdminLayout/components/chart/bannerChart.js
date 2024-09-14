import React from "react";
import { useUserBanner } from "../../../../../hooks/Banner/useUserbanner";

export default function BannerChart() {
  const { data: userBanner = [], isLoading, isError } = useUserBanner();

  if (isLoading) {
    return <p className="text-center text-gray-500">Đang tải...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-gray-500">Có lỗi xảy ra khi tải banner.</p>
    );
  }
  const totalCategories = userBanner.length;

  return (
    <div className="rounded-lg p-4 text-white">
      <div className="font-semibold text-lg ">Total Banner</div>
      <div className="text-sm text-gray-800">
        Banner hiển thị trên hệ thống.
      </div>
      <div className="text-4xl font-bold">{totalCategories}</div>
    </div>
  );
}
