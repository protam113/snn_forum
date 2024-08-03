import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Popup = ({ isOpen, onClose, children }) => {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-zinc-800 bg-opacity-70 flex items-center justify-center">
      <div
        ref={popupRef}
        className="relative bg-zinc-800 p-6 rounded-md shadow-lg max-w-3xl w-full mx-4 md:mx-auto"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
