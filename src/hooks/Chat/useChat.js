// hooks/useChat.js
import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify"; // Nhớ import toast để hiển thị thông báo
import useAuth from "../useAuth";

const useChat = (user_id) => {
  const { getToken } = useAuth();

  const fetchChat = async ({ pageParam = 1 }) => {
    try {
      const token = getToken(); // Lấy token trong mỗi lần gọi API
      let url = endpoints.Chatting;

      // Kiểm tra group_id và user_id để xây dựng URL

      if (user_id) {
        url += `?user_id=${user_id}&page=${pageParam}`;
      } else {
        throw new Error("Cần cung cấp group_id hoặc user_id");
      }

      const response = await authApi(token).get(url);
      const results = response.data.results || [];
      const next = response.data.next;

      return {
        chat: results.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        ),
        nextPage: next ? pageParam + 1 : null,
      };
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải tin nhắn!");
      throw error;
    }
  };

  // Custom hook for chat list
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["chats", { user_id }],
      queryFn: ({ pageParam }) => fetchChat({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export { useChat };
