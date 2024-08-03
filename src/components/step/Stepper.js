import React from "react";

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-400"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
