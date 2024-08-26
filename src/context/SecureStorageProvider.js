// src/context/SecureStorageContext.js

import React, { createContext, useContext } from "react";
import {
  setEncryptedLocalStorage,
  getDecryptedLocalStorage,
  removeLocalStorage,
  setEncryptedCookie,
  getDecryptedCookie,
  removeCookie,
} from "../utils/cryptoUtils";

const SecureStorageContext = createContext();

export const useSecureStorage = () => {
  return useContext(SecureStorageContext);
};

export const SecureStorageProvider = ({ children }) => {
  return (
    <SecureStorageContext.Provider
      value={{
        setEncryptedLocalStorage,
        getDecryptedLocalStorage,
        removeLocalStorage,
        setEncryptedCookie,
        getDecryptedCookie,
        removeCookie,
      }}
    >
      {children}
    </SecureStorageContext.Provider>
  );
};
