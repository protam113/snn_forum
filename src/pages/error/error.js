import React from "react";
import Img404 from "../../assets/img/error/errorWhite.png";
import Img500 from "../../assets/img/error/500error.png";

// 404 Error Component
const Error404 = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src={Img404} alt="Error 404" className="w-1/2 mb-8" />
      <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-3xl font-semibold mb-2 text-white">
        It's just a 404 error
      </p>
      <p className="text-lg text-zinc-200 text-center mb-8">
        What you're looking for may have been misplaced in Long Term Memory!
      </p>
      <button
        onClick={handleRetry}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

// 500 Error Component
const Error500 = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src={Img500} alt="Error 500" className="w-1/2 mb-8" />
      <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
      <p className="text-3xl font-semibold mb-2 text-white">
        Error 500: Something Went Wrong
      </p>
      <p className="text-lg text-zinc-200 text-center mb-8">
        Sorry, there was a problem processing your request. Please try again
        later.
      </p>
      <button
        onClick={handleRetry}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );
};

export { Error404, Error500 };
