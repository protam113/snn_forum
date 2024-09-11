import {
  useMutation,
  useQueryClient,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

const fetchRecruitmentList = async ({ pageParam = 1 }) => {
  try {
    const response = await authApi().get(
      `${endpoints.Recruitment}?page=${pageParam}`
    );
    const results = response.data.results || [];
    const next = response.data.next;

    return {
      recruitments: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải tin tuyển dụng!");
    throw error;
  }
};

// Custom hook for Recruitment list
const useRecruitmentList = () => {
  return useInfiniteQuery({
    queryKey: ["recruitments"],
    queryFn: ({ pageParam }) => fetchRecruitmentList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Fetch Recruitment detail
const fetchRecruitmentDetail = async (postId) => {
  if (!postId) return null;

  try {
    const url = endpoints.RecruitmentDetail.replace(":id", postId);
    const response = await authApi().get(url);
    return response.data;
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải tin tuyển dụng!");
    throw error;
  }
};

const useRecruitmentDetail = (postId) => {
  return useQuery({
    queryKey: ["recruitment", postId],
    queryFn: () => fetchRecruitmentDetail(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  });
};

const AddRecruitment = async (newRecruitment, token) => {
  const formData = new FormData();

  for (const key in newRecruitment) {
    if (Array.isArray(newRecruitment[key])) {
      newRecruitment[key].forEach((value) => formData.append(key, value));
    } else {
      formData.append(key, newRecruitment[key]);
    }
  }

  if (!token) throw new Error("No token available");

  const response = await authApi(token).post(endpoints.Recruitment, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const useAddRecruitment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (newRecruitment) => {
      const token = await getToken();
      return AddRecruitment(newRecruitment, token);
    },
    onSuccess: () => {
      toast.success("Sản phẩm đã được thêm thành công");
      queryClient.invalidateQueries(["recruitments"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Recruitment.");
    },
  });
};

// Update Recruitment
const updateRecruitment = async ({ postId, edtRecruitment, token }) => {
  if (!token) throw new Error("No token available");

  const formData = new FormData();

  for (const key in edtRecruitment) {
    if (Array.isArray(edtRecruitment[key])) {
      edtRecruitment[key].forEach((value) => formData.append(key, value));
    } else {
      formData.append(key, edtRecruitment[key]);
    }
  }

  const response = await authApi(token).patch(
    endpoints.RecruitmentDetail.replace(":id", postId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const useEditRecruitment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ postId, edtRecruitment }) => {
      const token = await getToken();
      return updateRecruitment({ postId, edtRecruitment, token });
    },
    onSuccess: () => {
      toast.success("Tin tuyển dụng đã được cập nhật thành công");
      queryClient.invalidateQueries(["recruitment"]);
      queryClient.invalidateQueries(["recruitments"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi cập nhật tin tuyển dụng!");
    },
  });
};

const deleteRecruitment = async ({ postId, token }) => {
  if (!token) throw new Error("No token available");
  if (!postId) throw new Error("PostId is missing");

  try {
    await authApi(token).delete(
      endpoints.RecruitmentDetail.replace(":id", postId)
    );
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa tin tuyển dụng.");
    throw error;
  }
};

const useDeleteRecruitment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ postId }) => {
      const token = await getToken();
      return deleteRecruitment({ postId, token });
    },
    onSuccess: () => {
      toast.success("Tin tuyển dụng đã được xóa thành công");
      queryClient.invalidateQueries(["recruitments"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi xóa tin tuyển dụng!");
    },
  });
};

export {
  useRecruitmentList,
  useRecruitmentDetail,
  useAddRecruitment,
  useEditRecruitment,
  useDeleteRecruitment,
};
