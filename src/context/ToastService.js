// toastService.js
import { createContext, useContext, useRef } from "react";
import ToastContainer from "../components/notification/ToastContainer";

const ToastContext = createContext();

export const ToastDesignProvider = ({ children }) => {
  const toastRef = useRef();

  const addNotification = (text, type) => {
    if (toastRef.current) {
      toastRef.current.addNotification(text, type);
    }
  };

  return (
    <ToastContext.Provider value={{ addNotification }}>
      {children}
      <ToastContainer ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToastDesign = () => {
  return useContext(ToastContext);
};
