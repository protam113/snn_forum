import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

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

const addBlog = async (formData, token) => {
  if (!token) throw new Error("No token available");

  try {
    const response = await authApi(token).post(endpoints.Blog, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding blog:", error.response?.data || error.message);
    throw error;
  }
};

const useAddBlog = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (newBlog) => {
      const token = await getToken();
      return addBlog(newBlog, token);
    },
    onSuccess: () => {
      toast.success("Blog đã được thêm thành công");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi tạo blog!");
    },
  });
};

const deleteBlog = async ({ blogId, token }) => {
  if (!token) throw new Error("No token available");
  if (!blogId) throw new Error("BlogId is missing");

  try {
    await authApi(token).delete(endpoints.BlogDetail.replace(":id", blogId));
  } catch (error) {
    // toast.error("Đã xảy ra lỗi khi xóa blog.");
    throw error;
  }
};

const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ blogId }) => {
      const token = await getToken();
      return deleteBlog({ blogId, token });
    },
    onSuccess: () => {
      toast.success("Blog đã được xóa thành công");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi xóa blog!");
    },
  });
};

export { useBlogList, useAddBlog, useDeleteBlog };
