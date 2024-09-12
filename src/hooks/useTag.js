import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const fetchTags = async (page = 1) => {
  try {
    const response = await authApi().get(`${endpoints.Tag}?page=${page}`);
    return {
      tags: response.data.results || [],
      totalPages: Math.ceil(response.data.count / 20),
      currentPage: page,
    };
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi tải tags!");
    throw error;
  }
};

const useTags = (page, hasTags) => {
  return useQuery({
    queryKey: ["tags", page],
    queryFn: () => fetchTags(page),
    staleTime: 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: hasTags || page === 1,
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

  return useMutation({
    mutationFn: async (newTag) => {
      const token = await getToken();
      return AddTag(newTag, token);
    },
    onSuccess: () => {
      toast.success("Tag đã được thêm thành công");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add Tag.");
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
    toast.error("Đã xảy ra lỗi khi cập nhật tag.");
    throw error;
  }
};

const useEditTag = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ TagId, edtTag }) => {
      const token = await getToken();
      return updateTag({ TagId, edtTag, token });
    },
    onSuccess: () => {
      toast.success("Tag đã được cập nhật thành công");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi cập nhật tag!");
    },
  });
};

const deleteTag = async ({ TagId, token }) => {
  if (!token) throw new Error("No token available");
  if (!TagId) throw new Error("TagId is missing");

  try {
    await authApi(token).delete(endpoints.TagId.replace(":id", TagId));
  } catch (error) {
    toast.error("Đã xảy ra lỗi khi xóa tag.");
    throw error;
  }
};

const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ TagId }) => {
      const token = await getToken();
      return deleteTag({ TagId, token });
    },
    onSuccess: () => {
      toast.success("Tag đã được xóa thành công");
      queryClient.invalidateQueries(["tags"]);
    },
    onError: (error) => {
      toast.error(error.message || "Lỗi khi xóa tag!");
    },
  });
};

export { useTags, useAddTag, useEditTag, useDeleteTag };
