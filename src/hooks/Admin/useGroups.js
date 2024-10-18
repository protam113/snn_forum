import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

// Hàm fetchGroups dùng để lấy danh sách nhóm từ API
const fetchGroups = async (getToken) => {
  try {
    const token = await getToken(); // Lấy token từ hook auth
    // Gửi yêu cầu GET tới API để lấy danh sách nhóm
    const response = await authApi(token).get(endpoints.GroupList);

    // Trả về kết quả hoặc mảng rỗng nếu không có kết quả
    return response.data.results || [];
  } catch (err) {
    // Ghi log lỗi nếu có sự cố trong việc lấy dữ liệu
    console.error("Đã xảy ra lỗi khi lấy danh sách nhóm");
    throw err; // Ném lỗi để useQuery xử lý
  }
};

// Custom hook để lấy danh sách nhóm
const useGroups = () => {
  const { getToken } = useAuth(); // Khai báo hook để lấy token

  return useQuery({
    queryKey: ["groups"], // Khóa truy vấn duy nhất cho dữ liệu nhóm
    queryFn: () => fetchGroups(getToken), // Gọi hàm fetchGroups
    staleTime: 60000, // Thời gian giữ dữ liệu còn tươi mới (60 giây)
    onError: (err) => {
      // Ghi log lỗi khi có lỗi xảy ra
      console.error("Error fetching groups:", err);
    },
  });
};

export { useGroups }; // Xuất custom hook
