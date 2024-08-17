import React, { Suspense, lazy } from "react";

// Lazy load the Blog component
const Blog = lazy(() => import("../blog"));

const Newfeed = () => {
  return (
    <div className="flex-1 p-4">
      <div className="mx-auto max-w-4xl py-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Blog />
        </Suspense>
      </div>
    </div>
  );
};

export default Newfeed;
