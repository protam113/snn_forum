import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";

const fetchAllTags = async () => {
  let allTags = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await authApi().get(`${endpoints.Tag}?page=${page}`);

      const results = response.data.results || [];
      allTags = [
        ...allTags,
        ...results.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        ),
      ];

      hasMore = response.data.next !== null;
      page++;
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải tags!");
      throw error;
    }
  }

  return allTags;
};

const useUserTag = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchAllTags,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export { useUserTag };
