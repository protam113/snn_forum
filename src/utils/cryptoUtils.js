import CryptoJS from "crypto-js";

export const encodeId = (id) => {
  const hash = CryptoJS.SHA256(id.toString());
  return hash.toString(CryptoJS.enc.Hex);
};

export function decodeId(encodedId) {
  try {
    return atob(encodedId);
  } catch (error) {
    console.error("Error decoding ID:", error);
    return null;
  }
}
