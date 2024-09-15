import React, { useEffect } from "react";
import {
  FiCheckSquare,
  FiX,
  FiAlertCircle,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";
import { motion } from "framer-motion";

const NOTIFICATION_TTL = 3000;

const Notification = ({ text, id, removeNotif, type }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-custom-red";
      case "warning":
        return "bg-amber-500";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      default:
        return "bg-indigo-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <FiAlertCircle />;
      case "warning":
        return <FiAlertTriangle />;
      case "info":
        return <FiInfo />;
      case "success":
        return <FiCheckSquare />;
      default:
        return <FiInfo />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white ${getBgColor()} pointer-events-auto`}
    >
      <span className="mt-0.5">{getIcon()}</span>
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default Notification;
