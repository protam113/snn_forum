import React, { useState } from "react";
import { useTheme } from "../../../../context/themeContext";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div
      className={`py-2 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
    >
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className={`flex justify-between w-full ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <span>{title}</span>
        <svg
          className={`shrink-0 ml-8 transition-transform duration-200 ease-out ${
            theme === "dark" ? "stroke-gray-300" : "stroke-gray-800"
          } ${accordionOpen ? "rotate-180" : "rotate-0"}`}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="7" width="16" height="2" rx="1" className="fill-current" />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className="fill-current rotate-90"
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        } text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
