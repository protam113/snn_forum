// context/ErrorContext.js
import React, { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
