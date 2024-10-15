import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const fetchUserChatList = async ({ pageParam = 1, token }) => {
  try {
    const response = await authApi(token).get(
      `${endpoints.createUser}?page=${pageParam}`
    );
    const results = response.data.results || [];
    const next = response.data.next;

    return {
      users: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (err) {
    console.error("Lỗi khi lấy danh sách user:", err);
    throw new Error("Failed to fetch users");
  }
};

const useUserChatList = () => {
  const { getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  const query = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam }) => {
      const token = await getToken();
      return fetchUserChatList({ pageParam, token });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isReady,
    staleTime: 60000,
  });

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setIsReady(true);
      }
    };
    fetchToken();
  }, [getToken]);

  return query;
};

export { useUserChatList };
