import { useEffect, useRef } from "react"; // Nhập các hook cần thiết từ React

const useClickOutside = (callback) => {
  const ref = useRef(null); // Tạo một ref để theo dõi phần tử được gán

  useEffect(() => {
    // Hook useEffect để theo dõi sự kiện click ngoài
    const handleClickOutside = (event) => {
      // Hàm xử lý sự kiện click
      if (ref.current && !ref.current.contains(event.target)) {
        // Kiểm tra xem click có nằm ngoài phần tử ref hay không
        callback(); // Nếu có, gọi hàm callback
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Thêm event listener cho sự kiện mousedown

    // Hàm cleanup để xóa event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Xóa event listener
    };
  }, [callback]); // Chạy lại effect nếu callback thay đổi

  return ref; // Trả về ref để sử dụng trong component
};

export default useClickOutside; // Xuất hook useClickOutside
