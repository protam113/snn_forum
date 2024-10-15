import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { setOtherUsers } from "../../redux/userSlice";

const useGetOtherGroups = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = getToken();

        // Đảm bảo endpoint này là đúng
        const url = `${endpoints.GroupChat}`; // Thay đổi nếu cần

        const response = await authApi(token).get(url);
        const results = response.data.results || []; // Kiểm tra đúng cấu trúc trả về

        // Cập nhật Redux store
        dispatch(setOtherUsers(results)); // Sửa để sử dụng results mà không cần .data
      } catch (error) {
        console.error("Error fetching other users:", error); // Log lỗi
      }
    };

    fetchOtherUsers();
  }, [dispatch, getToken]); // Thêm getToken vào dependency array
};

export default useGetOtherGroups;
