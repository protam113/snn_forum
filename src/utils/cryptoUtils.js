import CryptoJS from "crypto-js";

// Lấy khóa bí mật từ biến môi trường
const secretKey = process.env.REACT_APP_SECRET_KEY;

if (!secretKey) {
  throw new Error("REACT_APP_SECRET_KEY chưa được định nghĩa");
}

// Encrypt data function
export const encryptData = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    throw new Error("Lỗi khi mã hóa: " + error.message);
  }
};

// Decrypt data function
export const decryptData = (ciphertext) => {
  if (typeof ciphertext !== "string") {
    throw new Error("Ciphertext phải là một chuỗi");
  }

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error(
        "Không thể giải mã dữ liệu. Có thể khóa bí mật không đúng."
      );
    }

    try {
      return JSON.parse(decryptedData);
    } catch (e) {
      return decryptedData;
    }
  } catch (error) {
    throw new Error("Lỗi khi giải mã: " + error.message);
  }
};
export const setEncryptedLocalStorage = (key, value) => {
  try {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error(
      "Lỗi khi thiết lập dữ liệu mã hóa trong localStorage:",
      error
    );
  }
};

// Hàm lấy dữ liệu đã giải mã từ localStorage
export const getDecryptedLocalStorage = (key) => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    return decryptData(encryptedValue);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu giải mã từ localStorage:", error);
    return null;
  }
};

// Hàm xóa mục khỏi localStorage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// Hàm thiết lập dữ liệu đã mã hóa trong cookie
export const setEncryptedCookie = (name, value, days = 7) => {
  try {
    const encryptedValue = encryptData(value);
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      encryptedValue
    )};expires=${expires.toUTCString()};path=/`;
  } catch (error) {
    console.error("Lỗi khi thiết lập cookie mã hóa:", error);
  }
};

// Hàm lấy dữ liệu đã giải mã từ cookie
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
        console.error("Lỗi khi giải mã dữ liệu cookie:", error);
        return null;
      }
    }
  }
  return null;
};

// Hàm xóa cookie
export const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};
