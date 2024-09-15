import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";
import { useToastDesign } from "../../context/ToastService";

const fetchBlog = async (blogId, getToken) => {
  if (!blogId) return null;

  try {
    const url = endpoints.BlogDetail.replace(":id", blogId);

    const response = await authApi().get(url);
    const blogData = response.data;

    const token = await getToken();
    const likedByUser = token ? blogData.liked || false : false;

    return { ...blogData, likedByUser };
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết blog:", error);
    throw new Error("Lỗi khi lấy chi tiết blog. Vui lòng thử lại sau.");
  }
};

const useBlogDetail = (blogId) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlog(blogId, getToken),
    enabled: !!blogId,
    staleTime: 5 * 60 * 1000,
  });
};

const editBlog = async ({ blogId, edtBlog, token }) => {
  if (!token) throw new Error("No token available");

  const formData = new FormData();

  for (const key in edtBlog) {
    if (Array.isArray(edtBlog[key])) {
      edtBlog[key].forEach((value) => formData.append(key, value));
    } else {
      formData.append(key, edtBlog[key]);
    }
  }

  const url = endpoints.BlogDetail.replace(":id", blogId);

  try {
    const response = await authApi(token).patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating blog:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const useEditBlog = (blogId) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ edtBlog }) => {
      const token = await getToken();
      return editBlog({ blogId, edtBlog, token });
    },
    onSuccess: () => {
      addNotification("Blog đã được cập nhật thành công", "success");
      queryClient.invalidateQueries(["blog", blogId]);
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi cập nhật blog!");
    },
  });
};

export { useBlogDetail, useEditBlog };
