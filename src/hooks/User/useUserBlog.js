import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";

const fetchUserBlog = async ({ pageParam = 1, personId }) => {
  try {
    const response = await authApi().get(
      `${endpoints.currentUserBlog.replace(":id", personId)}?page=${pageParam}`
    );
    const results = response.data.results || [];
    const next = response.data.next;

    return {
      recruitments: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải blog!");
    throw error;
  }
};

// Custom hook for User Blog list
const useUserBlog = (personId) => {
  return useInfiniteQuery({
    queryKey: ["userBlog", personId],
    queryFn: ({ pageParam = 1 }) => fetchUserBlog({ pageParam, personId }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export { useUserBlog };
