// useBlogList.js
import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const FetchBlogList = async ({ pageParam = 1 }) => {
  try {
    const { getToken } = useAuth();
    const token = await getToken();

    const response = token
      ? await authApi(token).get(`${endpoints.Blog}?page=${pageParam}`)
      : await authApi().get(`${endpoints.Blog}?page=${pageParam}`);

    const results = response.data.results || [];
    const next = response.data.next;

    // Log the response for debugging purposes
    console.log("Fetched data:", { results, next });

    return {
      blogs: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
};

export const useBlogList = () => {
  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: FetchBlogList,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000,
  });
};
