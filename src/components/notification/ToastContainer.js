import React, { useState, forwardRef, useImperativeHandle } from "react";
import { AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const ToastContainer = forwardRef((_, ref) => {
  const [notifications, setNotifications] = useState([]);

  useImperativeHandle(ref, () => ({
    addNotification: (text, type) => {
      setNotifications((prev) => [{ id: Date.now(), text, type }, ...prev]);
    },
  }));

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="fixed top-2 right-2 z-50 pointer-events-none flex flex-col gap-1 w-72">
      <AnimatePresence>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            {...notif}
            removeNotif={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default ToastContainer;
