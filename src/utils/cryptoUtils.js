import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

if (!secretKey) {
  throw new Error("REACT_APP_SECRET_KEY is not defined");
}

export const encryptData = (data) => {
  if (typeof data !== "string") {
    data = JSON.stringify(data); // Chuyển đổi thành chuỗi JSON nếu không phải là chuỗi
  }

  try {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  } catch (error) {
    throw new Error("Error during encryption: " + error.message);
  }
};

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

    return JSON.parse(decryptedData); // Chuyển đổi lại thành đối tượng nếu cần
  } catch (error) {
    throw new Error("Error during decryption: " + error.message);
  }
};
