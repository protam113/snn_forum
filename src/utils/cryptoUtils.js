// src/utils/cryptoUtils.js

import CryptoJS from "crypto-js";

// Load the secret key from environment variables
const secretKey = process.env.REACT_APP_SECRET_KEY;

if (!secretKey) {
  throw new Error("REACT_APP_SECRET_KEY is not defined");
}

// Function to encrypt data
export const encryptData = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    throw new Error("Error during encryption: " + error.message);
  }
};

// Function to decrypt data
export const decryptData = (ciphertext) => {
  if (typeof ciphertext !== "string") {
    throw new Error("Ciphertext must be a string");
  }

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error("Failed to decrypt data. Possible incorrect secret key.");
    }

    return JSON.parse(decryptedData);
  } catch (error) {
    throw new Error("Error during decryption: " + error.message);
  }
};

// Function to set encrypted data in localStorage
export const setEncryptedLocalStorage = (key, value) => {
  try {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error("Error setting encrypted data in localStorage:", error);
  }
};

// Function to get decrypted data from localStorage
export const getDecryptedLocalStorage = (key) => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    return decryptData(encryptedValue);
  } catch (error) {
    console.error("Error getting decrypted data from localStorage:", error);
    return null;
  }
};

// Function to remove item from localStorage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// Function to set encrypted data in cookies
export const setEncryptedCookie = (name, value, days = 7) => {
  try {
    const encryptedValue = encryptData(value);
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      encryptedValue
    )};expires=${expires.toUTCString()};path=/`;
  } catch (error) {
    console.error("Error setting encrypted cookie:", error);
  }
};

// Function to get decrypted data from cookies
export const getDecryptedCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      try {
        const encryptedValue = decodeURIComponent(c.substring(nameEQ.length));
        return decryptData(encryptedValue);
      } catch (error) {
        console.error("Error decrypting cookie data:", error);
        return null;
      }
    }
  }
  return null;
};

// Function to remove cookie
export const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};
