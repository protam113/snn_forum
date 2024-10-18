import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
import { useCallback } from "react";
import { authApi, endpoints } from "../api/api";

const useUserSearch = (searchTerm, searchField = "username", delay = 500) => {
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  // Hàm xây dựng URL tìm kiếm với các tham số
  const buildSearchUrl = useCallback((baseURL, term, field) => {
    const params = new URLSearchParams();
    if (term) params.append(field, term);
    return `${baseURL}?${params.toString()}`;
  }, []);

  // Sử dụng useQuery để quản lý truy vấn tìm kiếm
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userSearch", debouncedSearchTerm, searchField], // Khóa truy vấn
    queryFn: async () => {
      if (!debouncedSearchTerm) return { results: [] }; // Nếu không có từ tìm kiếm, trả về mảng rỗng
      const url = buildSearchUrl(
        endpoints.createUser,
        debouncedSearchTerm,
        searchField
      );
      const response = await authApi().get(url);
      return response.data; // Giả sử response.data có cấu trúc { results: [...] }
    },
    enabled: !!debouncedSearchTerm, // Chỉ gọi API khi có từ tìm kiếm
    onSuccess: (data) => {
      console.log("Fetched user search results:", data.results);
    },
    onError: (error) => {
      console.error("Error fetching user search results:", error);
    },
  });

  return { results: data?.results || [], loading: isLoading, error: isError }; // Trả về kết quả tìm kiếm, trạng thái loading, lỗi
};

export default useUserSearch; // Xuất hook useUserSearch
