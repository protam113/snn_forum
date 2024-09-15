import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useToastDesign } from "../context/ToastService";

const fetchUserApplyList = async (token) => {
  try {
    const response = await authApi(token).get(endpoints.UserApplyList);
    return response.data.results || [];
  } catch (err) {
    console.error("Error fetching user apply list:", err);
    throw err;
  }
};

const useUserApplyList = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["userApplyList"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token available");
      }

      return fetchUserApplyList(token);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    onError: (error) => {
      console.error(`Error fetching user apply list: ${error.message}`);
    },
  });
};

const addApplyJob = async (newApplyJob, token, postId) => {
  const formData = new FormData();

  for (const key in newApplyJob) {
    if (Array.isArray(newApplyJob[key])) {
      newApplyJob[key].forEach((value) => formData.append(key, value));
    } else if (key === "cv" && newApplyJob[key]) {
      // Handle file
      formData.append("cv", newApplyJob[key]);
    } else {
      formData.append(key, newApplyJob[key]);
    }
  }

  if (!token) throw new Error("No token available");

  try {
    const response = await authApi(token).post(
      endpoints.ApplyJob.replace(":id", postId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const useAddApplyJob = (postId) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async (newAddApplyJob) => {
      const token = await getToken();
      return addApplyJob(newAddApplyJob, token, postId);
    },
    onSuccess: () => {
      addNotification("Đã ứng tuyển thành công!", "success");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
      queryClient.invalidateQueries(["userApplyList"]);
    },
    onError: (error) => {
      if (error.response?.status === 500) {
        addNotification("Bạn đã ứng tuyển vào vị trí này.", "warning");
      } else {
        console.error(error.message || "Failed to apply for job.");
      }
    },
  });
};

export { useUserApplyList, useAddApplyJob };
