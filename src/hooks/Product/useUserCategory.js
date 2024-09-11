import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";

const fetchAllCategories = async () => {
  let allCategories = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await authApi().get(
        `${endpoints.Categories}?page=${page}`
      );

      const results = response.data.results || [];
      allCategories = [
        ...allCategories,
        ...results.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        ),
      ];

      hasMore = response.data.next !== null;
      page++;
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải category!");
      throw error;
    }
  }

  return allCategories;
};

const useUserCategoryList = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

export { useUserCategoryList };
