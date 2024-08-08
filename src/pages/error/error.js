import React from "react";
import Img500 from "../../assets/img/error/500error.png";
import { useTheme } from "../../context/themeContext";

// 404 Error Component
const Error404 = () => {
  const { theme } = useTheme();

  const handleRetry = () => {
    window.location.reload();
  };

  // Select images and styles based on theme
  const img404 =
    theme === "light"
      ? require("../../assets/img/error/black_404.png")
      : require("../../assets/img/error/errorWhite.png");

  const textColor = theme === "light" ? "text-black" : "text-white";
  const buttonColor = theme === "light" ? "bg-blue-500" : "bg-gray-700";
  const buttonHoverColor =
    theme === "light" ? "hover:bg-blue-600" : "hover:bg-gray-600";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <img src={img404} alt="Error 404" className="w-1/2 mb-8" />
      <h1 className={`text-9xl font-bold ${textColor} mb-4`}>404</h1>
      <p className={`text-3xl font-semibold mb-2 ${textColor}`}>
        It's just a 404 error
      </p>
      <p className={`text-lg ${textColor} text-center mb-8`}>
        What you're looking for may have been misplaced in Long Term Memory!
      </p>
      <button
        onClick={handleRetry}
        className={`${buttonColor} ${buttonHoverColor} text-white px-6 py-3 rounded-lg text-lg font-semibold`}
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
