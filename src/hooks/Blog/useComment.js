import { useInfiniteQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";

const fetchComments = async ({ blogId, pageParam = 1 }) => {
  try {
    if (!blogId) throw new Error("Blog ID is required");

    const response = await authApi().get(
      `${endpoints.CmtBlog.replace(":id", blogId)}?page=${pageParam}`
    );

    const parentComments = response.data.results || [];
    return {
      parentComments,
      nextPage: response.data.next ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching parent comments:", error);
    throw error;
  }
};

const useComments = (blogId) => {
  return useInfiniteQuery({
    queryKey: ["parentComments", blogId],
    queryFn: ({ pageParam = 1 }) => fetchComments({ blogId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: Infinity,
    cacheTime: Infinity,
    onError: (err) => {
      console.error(`Error fetching parent comments: ${err.message}`);
    },
  });
};

export { useComments };
