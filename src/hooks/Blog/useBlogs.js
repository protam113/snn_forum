import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const FetchBlogList = async ({ pageParam = 1, token }) => {
  try {
    const response = token
      ? await authApi(token).get(`${endpoints.Blog}?page=${pageParam}`)
      : await authApi().get(`${endpoints.Blog}?page=${pageParam}`);

    const results = response.data.results || [];
    const next = response.data.next;

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

const useBlogList = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
      setIsReady(true);
    };
    fetchToken();
  }, [getToken]);

  return useInfiniteQuery({
    queryKey: ["blogs", token],
    queryFn: ({ pageParam }) => FetchBlogList({ pageParam, token }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isReady,
    staleTime: 60000,
  });
};

export { useBlogList };
