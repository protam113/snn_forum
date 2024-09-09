import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

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

export { useBlogDetail };
