import CryptoJS from "crypto-js";

// Lấy khóa bí mật từ biến môi trường
const secretKey = process.env.REACT_APP_SECRET_KEY;

// Kiểm tra nếu khóa bí mật chưa được định nghĩa
if (!secretKey) {
  throw new Error("REACT_APP_SECRET_KEY chưa được định nghĩa");
}

// Hàm mã hóa dữ liệu cho Redux
export const ReduxEncryptData = (data) => {
  // Kiểm tra và chuyển đổi dữ liệu về chuỗi nếu cần
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }
  try {
    // Mã hóa dữ liệu sử dụng CryptoJS AES
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    // Xử lý lỗi khi mã hóa
    throw new Error("Lỗi khi mã hóa: " + error.message);
  }
};

// Giải mã dữ liệu đã mã hóa
export const ReduxDecryptData = (ciphertext) => {
  // Kiểm tra loại dữ liệu ciphertext
  if (typeof ciphertext !== "string") {
    throw new Error("Ciphertext phải là một chuỗi");
  }
  try {
    // Giải mã ciphertext sử dụng khóa bí mật
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Kiểm tra nếu giải mã thất bại
    if (!decryptedData) {
      throw new Error(
        "Không thể giải mã dữ liệu. Có thể khóa bí mật không đúng."
      );
    }
    return decryptedData;
  } catch (error) {
    // Xử lý lỗi khi giải mã
    throw new Error("Lỗi khi giải mã: " + error.message);
  }
};

// Hàm mã hóa dữ liệu đơn giản
export const encryptData = (data) => {
  // Kiểm tra và chuyển đổi dữ liệu về chuỗi nếu cần
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  try {
    // Mã hóa dữ liệu
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    // Xử lý lỗi khi mã hóa
    throw new Error("Lỗi khi mã hóa: " + error.message);
  }
};

// Hàm giải mã dữ liệu đã mã hóa
export const decryptData = (ciphertext) => {
  // Kiểm tra loại dữ liệu ciphertext
  if (typeof ciphertext !== "string") {
    throw new Error("Ciphertext phải là một chuỗi");
  }

  try {
    // Giải mã ciphertext
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    // Kiểm tra nếu không thể giải mã
    if (!decryptedData) {
      throw new Error(
        "Không thể giải mã dữ liệu. Có thể khóa bí mật không đúng."
      );
    }

    // Trả về dữ liệu giải mã (JSON hoặc chuỗi)
    try {
      return JSON.parse(decryptedData);
    } catch (e) {
      return decryptedData;
    }
  } catch (error) {
    // Xử lý lỗi khi giải mã
    throw new Error("Lỗi khi giải mã: " + error.message);
  }
};

// Hàm lưu trữ dữ liệu đã mã hóa vào localStorage
export const setEncryptedLocalStorage = (key, value) => {
  try {
    // Mã hóa dữ liệu và lưu trữ vào localStorage
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    // Xử lý lỗi khi lưu trữ dữ liệu
    console.error(
      "Lỗi khi thiết lập dữ liệu mã hóa trong localStorage:",
      error
    );
  }
};

// Hàm lấy và giải mã dữ liệu từ localStorage
export const getDecryptedLocalStorage = (key) => {
  try {
    // Lấy giá trị mã hóa từ localStorage
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    // Giải mã giá trị và trả về
    return decryptData(encryptedValue);
  } catch (error) {
    // Xử lý lỗi khi giải mã dữ liệu
    console.error("Lỗi khi lấy dữ liệu giải mã từ localStorage:", error);
    return null;
  }
};

// Hàm xóa một mục khỏi localStorage
export const removeLocalStorage = (key) => {
  // Xóa giá trị dựa trên key
  localStorage.removeItem(key);
};

// Hàm thiết lập dữ liệu mã hóa trong cookie
export const setEncryptedCookie = (name, value, days = 7) => {
  try {
    // Mã hóa dữ liệu và thiết lập cookie
    const encryptedValue = encryptData(value);
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(
      encryptedValue
    )};expires=${expires.toUTCString()};path=/`;
  } catch (error) {
    // Xử lý lỗi khi thiết lập cookie
    console.error("Lỗi khi thiết lập cookie mã hóa:", error);
  }
};

// Hàm lấy dữ liệu đã giải mã từ cookie
export const getDecryptedCookie = (name) => {
  // Tìm cookie theo tên
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  // Duyệt qua danh sách cookie để tìm giá trị
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      try {
        // Giải mã giá trị cookie
        const encryptedValue = decodeURIComponent(c.substring(nameEQ.length));
        return decryptData(encryptedValue);
      } catch (error) {
        // Xử lý lỗi khi giải mã cookie
        console.error("Lỗi khi giải mã dữ liệu cookie:", error);
        return null;
      }
    }
  }
  return null;
};

// Hàm xóa cookie
export const removeCookie = (name) => {
  // Xóa cookie bằng cách đặt Max-Age thành -99999999
  document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
};
