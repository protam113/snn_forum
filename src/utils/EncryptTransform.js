import { ReduxEncryptData, ReduxDecryptData } from "./cryptoUtils";
import { createTransform } from "redux-persist";

// Tạo transform để mã hóa và giải mã
export const EncryptTransform = createTransform(
  // Mã hóa state trước khi lưu
  (inboundState) => {
    try {
      return ReduxEncryptData(JSON.stringify(inboundState));
    } catch (err) {
      console.error("Lỗi khi mã hóa dữ liệu:", err);
      return inboundState; // Nếu lỗi, trả về state gốc
    }
  },
  // Giải mã state sau khi lấy ra
  (outboundState) => {
    try {
      const decryptedData = ReduxDecryptData(outboundState);
      return JSON.parse(decryptedData);
    } catch (err) {
      console.error("Lỗi khi giải mã dữ liệu:", err);
      return outboundState; // Nếu lỗi, trả về state đã mã hóa
    }
  }
);
