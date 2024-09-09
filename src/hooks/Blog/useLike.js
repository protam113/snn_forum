import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const toggleLike = async ({ blogId, isLiked }, { signal }) => {
  try {
    const url = endpoints.LikeBlog.replace(":id", blogId);
    let response;

    if (isLiked) {
      response = await authApi(signal).delete(url);
    } else {
      response = await authApi(signal).post(url);
    }

    return response.data;
  } catch (error) {
    console.error("Error toggling like status:", error);
    throw new Error("Failed to toggle like status");
  }
};

const useLikeBlog = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(toggleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      // Handle error for UI feedback
    },
  });

  const handleLike = async (blogId, isLiked) => {
    const token = await getToken();
    mutate({ blogId, isLiked });
  };

  return { handleLike, isLoading, isError, error };
};

export { useLikeBlog };
