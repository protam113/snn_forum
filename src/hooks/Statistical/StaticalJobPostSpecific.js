import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { toast } from "react-toastify";

const fetchStaticalJobPostSpecific = async (
  startDate,
  endDate,
  token,
  job_post_id
) => {
  try {
    if (!token) {
      throw new Error("Không có token");
    }

    if (!startDate || !endDate) {
      throw new Error("Start date hoặc end date không hợp lệ");
    }

    if (!job_post_id) {
      throw new Error("job_post_id không hợp lệ");
    }

    const response = await authApi(token).get(
      `${endpoints.StaticalJobPostSpecific}?start_date=${encodeURIComponent(
        startDate
      )}&end_date=${encodeURIComponent(
        endDate
      )}&job_post_id=${encodeURIComponent(job_post_id)}`
    );

    return response.data;
  } catch (err) {
    toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    throw err;
  }
};

const useStaticalJobPostSpecific = (startDate, endDate, job_post_id) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["staticalJobPostSpecific", startDate, endDate, job_post_id],
    queryFn: async () => {
      const token = await getToken();
      return fetchStaticalJobPostSpecific(
        startDate,
        endDate,
        token,
        job_post_id
      );
    },
    staleTime: 60000,
    enabled: !!job_post_id, // Chỉ gọi API khi có job_post_id
    onError: (err) => {
      console.log("Error fetching job post statistics:", err);
    },
    refetchOnWindowFocus: true,
  });
};

export { useStaticalJobPostSpecific };
