import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { useToastDesign } from "../context/ToastService";

const fetchTags = async (page = 1) => {
  try {
    const response = await authApi().get(`${endpoints.Tag}?page=${page}`);
    return {
      tags: response.data.results || [],
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
    };
  } catch (error) {
    console.error("Đã xảy ra lỗi khi tải tags!");
    throw error;
  }
};

const useTags = (page, hasTags) => {
  const { addNotification } = useToastDesign();

  return useQuery({
    queryKey: ["tags", page],
    queryFn: () => fetchTags(page),
    staleTime: 60 * 1000, // 1 phút
    cacheTime: 10 * 60 * 1000, // 10 phút
    enabled: hasTags || page === 1,
    retry: (failureCount, error) => {
      if (failureCount < 3 && error.message !== "Không có dữ liệu") {
        return true;
      }
      return false;
    },
    onError: (error) => {
      addNotification("Đã xảy ra lỗi khi tải tags:", "error", error.message);
    },
  });
};

const AddTag = async (newTag, token) => {
  const formData = new FormData();

  formData.append("name", newTag.name);

  if (!token) throw new Error("No token available");

  const response = await authApi(token).post(endpoints.Tag, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const useAddTag = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async (newTag) => {
      const token = await getToken();
      return AddTag(newTag, token);
    },
    onSuccess: () => {
      addNotification("Tag đã được thêm thành công", "success");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      addNotification(error.message || "Failed to add Tag.", "error");
    },
  });
};

//Update Tag
const updateTag = async ({ TagId, edtTag, token }) => {
  if (!token) throw new Error("No token available");
  if (!TagId) throw new Error("TagId is missing");

  const formData = new FormData();
  if (edtTag.name) {
    formData.append("name", edtTag.name);
  }

  try {
    const response = await authApi(token).patch(
      endpoints.TagId.replace(":id", TagId), // Use your defined endpoint with :id placeholder
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Đã xảy ra lỗi khi cập nhật tag.");
    throw error;
  }
};

const useEditTag = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ TagId, edtTag }) => {
      const token = await getToken();
      return updateTag({ TagId, edtTag, token });
    },
    onSuccess: () => {
      addNotification("Tag đã được cập nhật thành công", "success");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi cập nhật tag!");
    },
  });
};

const deleteTag = async ({ TagId, token }) => {
  if (!token) throw new Error("No token available");
  if (!TagId) throw new Error("TagId is missing");

  try {
    await authApi(token).delete(endpoints.TagId.replace(":id", TagId));
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa tag.");
    throw error;
  }
};

const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ TagId }) => {
      const token = await getToken();
      return deleteTag({ TagId, token });
    },
    onSuccess: () => {
      addNotification("Tag đã được xóa thành công", "success");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi xóa tag!", "error");
    },
  });
};

export { useTags, useAddTag, useEditTag, useDeleteTag };
