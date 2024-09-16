import {
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useToastDesign } from "../../context/ToastService";

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

const fetchCommentChild = async ({ commentId, pageParam = 1 }) => {
  if (!commentId) throw new Error("Comment ID is required");

  try {
    const response = await authApi().get(
      `${endpoints.CmtBlogReply.replace(":id", commentId)}?page=${pageParam}`
    );
    const commentChild = response.data.results || [];
    return {
      commentChild,
      nextPage: response.data.next ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error(`Error fetching child comments: ${error.message}`);
    throw error;
  }
};

const useCommentChild = (commentId) => {
  return useInfiniteQuery({
    queryKey: ["commentChild", commentId],
    queryFn: ({ pageParam = 1 }) => fetchCommentChild({ commentId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    staleTime: Infinity,
    cacheTime: Infinity,
    onError: (err) => {
      console.error(`Error fetching child comments: ${err.message}`);
    },
  });
};

const AddComment = async (formData, token, blogId) => {
  if (!token) throw new Error("No token available");

  try {
    const response = await authApi(token).post(
      endpoints.CmtBlog.replace(":id", blogId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Lỗi khi tạo Comment:", err);
    throw err;
  }
};

// Custom hook để thêm comment
const useAddComment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ blogId, contentData, parentId }) => {
      const token = await getToken();

      const formData = new FormData();
      formData.append("content", contentData.content);
      if (contentData.file) {
        formData.append("file", contentData.file);
      }
      if (parentId) {
        formData.append("parent", parentId);
      }

      return AddComment(formData, token, blogId);
    },
    onSuccess: () => {
      addNotification("Comment đã được thêm thành công", "success");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      addNotification("Lỗi khi thêm Comment!", "error");
      console.error(error.message || "Lỗi khi tạo Comment!");
    },
  });
};

const editComment = async ({ commentId, token, contentData }) => {
  if (!token) throw new Error("No token available");
  if (!commentId) throw new Error("Comment ID is missing");

  const formData = new FormData();
  formData.append("content", contentData.content);
  if (contentData.file) {
    formData.append("file", contentData.file);
  }

  try {
    const response = await authApi(token).put(
      endpoints.DelCmt.replace(":id", commentId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error updating comment:", err);
    throw err;
  }
};

const useEditComment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ commentId, contentData }) => {
      try {
        const token = await getToken();
        return await editComment({ commentId, token, contentData });
      } catch (error) {
        console.error(error.message || "Error updating comment!");
        throw error;
      }
    },
    onSuccess: () => {
      addNotification("Comment đã được cập nhật thành công", "success");
      queryClient.invalidateQueries(["parentComments"]);
    },
    onError: (error) => {
      addNotification("Lỗi khi cập nhật Comment!", "error");
      console.error(error.message || "Error updating comment!");
    },
  });
};

const deleteComment = async ({ commentId, token }) => {
  if (!token) throw new Error("No token available");
  if (!commentId) throw new Error("CommentId is missing");

  try {
    await authApi(token).delete(endpoints.DelCmt.replace(":id", commentId));
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ commentId }) => {
      const token = await getToken();
      return deleteComment({ commentId, token });
    },
    onSuccess: () => {
      addNotification("Comment đã được xóa thành công", "success");
      queryClient.invalidateQueries(["parentComments"]);
    },
    onError: (err) => {
      addNotification("Lỗi khi xóa Comment", "error");
      console.error("Lỗi khi xóa Comment:", err);
    },
  });
};

export {
  useComments,
  useAddComment,
  useDeleteComment,
  useEditComment,
  useCommentChild,
};
