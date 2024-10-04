import React from "react";
import { useUserTag } from "../../../../../hooks/Product/useUserTag";

export default function TagChart() {
  const { data: tags, isLoading, isError } = useUserTag();

  const totalTags = tags ? tags.length : 0;

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load tags</p>;
  }

  return (
    <div className=" rounded-lg p-4 text-Black">
      <div className="font-semibold text-lg">Total Tags</div>
      <div className="text-sm text-gray-800">Tags có trong hệ thống.</div>
      <div className="text-4xl font-bold">{totalTags}</div>
    </div>
  );
}
