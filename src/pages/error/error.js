import React from "react";
import Img500 from "../../assets/img/error/500error.png";
import { useTheme } from "../../context/themeContext";
import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

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

const WebMaintenance = () => {
  return (
    <div className="flex items-center justify-center bg-background py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <CiSettings className="mx-auto h-12 w-12 text-primary spin" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Website Maintenance
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're currently performing scheduled maintenance on our website. We
          apologize for any inconvenience and expect to have the site back up
          and running shortly.
        </p>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Check Status
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Error404, Error500, WebMaintenance };
