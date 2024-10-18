import { ReduxEncryptData, ReduxDecryptData } from "./cryptoUtils";
import { createTransform } from "redux-persist";

// Tạo transform để mã hóa và giải mã state trong Redux Persist
export const EncryptTransform = createTransform(
  // Hàm mã hóa state trước khi lưu vào storage
  (inboundState) => {
    try {
      // Mã hóa state và trả về chuỗi mã hóa
      return ReduxEncryptData(JSON.stringify(inboundState));
    } catch (err) {
      // Xử lý lỗi khi mã hóa, trả về state gốc nếu gặp lỗi
      console.error("Lỗi khi mã hóa dữ liệu:", err);
      return inboundState;
    }
  },
  // Hàm giải mã state sau khi lấy từ storage
  (outboundState) => {
    try {
      // Giải mã dữ liệu và chuyển đổi về đối tượng JavaScript
      const decryptedData = ReduxDecryptData(outboundState);
      return JSON.parse(decryptedData);
    } catch (err) {
      // Xử lý lỗi khi giải mã, trả về state đã mã hóa nếu gặp lỗi
      console.error("Lỗi khi giải mã dữ liệu:", err);
      return outboundState;
    }
  }
);
