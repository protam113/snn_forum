import { useState, useCallback } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { toast } from "react-toastify";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useRecruitment = (postId) => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recruitment, setRecruitment] = useState(null);
  const { getToken } = useAuth();

  const fetchRecruitments = useCallback(async () => {
    setLoading(true);

    const cacheKey = "recruitments_data";
    const cacheTimeKey = `${cacheKey}_time`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    const now = new Date().getTime();
    const cacheDuration = 60 * 1000; // 1 minute

    if (
      cachedData &&
      cachedTime &&
      now - parseInt(cachedTime) < cacheDuration
    ) {
      try {
        // Giải mã và sau đó parse JSON
        const decryptedData = decryptData(cachedData);
        const parsedData = JSON.parse(decryptedData);
        setRecruitments(parsedData);
      } catch (error) {
        console.error("Error parsing cached data:", error.message);
      }
      setLoading(false);
      return;
    }

    try {
      const response = await authApi().get(endpoints.Recruitment);
      const results = response.data.results;

      if (!Array.isArray(results)) {
        throw new Error("Results is not an array");
      }

      const uniqueResults = Array.from(new Set(results.map((r) => r.id))).map(
        (id) => results.find((r) => r.id === id)
      );
      const sortedRecruitments = uniqueResults.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setRecruitments(sortedRecruitments);

      // Chuyển đổi sang JSON trước khi mã hóa
      const jsonData = JSON.stringify(sortedRecruitments);
      const encryptedData = encryptData(jsonData);
      localStorage.setItem(cacheKey, encryptedData);
      localStorage.setItem(cacheTimeKey, now.toString());
    } catch (error) {
      console.error(
        "Error fetching recruitments:",
        error.response?.data || error.message
      );
      setError("Error fetching recruitments");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecruitment = useCallback(async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const url = endpoints.RecruitmentDetail.replace(":id", postId);
      const response = await authApi().get(url);
      setRecruitment(response.data);
    } catch (error) {
      console.error("Error fetching recruitment detail:", error);
      setError("Error fetching recruitment detail");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const handleDeleteRecruitment = useCallback(
    async (postId) => {
      const token = await getToken();
      if (!token) return;

      try {
        const url = endpoints.RecruitmentDetail.replace(":id", postId);
        await authApi(token).delete(url);

        setRecruitments((prevRecruitments) =>
          prevRecruitments.filter((recruitment) => recruitment.id !== postId)
        );

        if (recruitment && recruitment.id === postId) {
          setRecruitment(null);
        }
      } catch (error) {
        console.error("Error deleting recruitment:", error);
        setError("Error deleting recruitment");
      }
    },
    [getToken, recruitment]
  );

  const addRecruitment = useCallback(
    async (newRecruitment) => {
      const token = await getToken();
      if (!token) return;

      try {
        const response = await authApi(token).post(
          endpoints.Recruitment,
          newRecruitment
        );

        setRecruitments((prevRecruitments) => [
          response.data,
          ...prevRecruitments,
        ]);

        setRecruitment(response.data);
      } catch (error) {
        console.error(
          "Error adding recruitment:",
          error.response?.data || error.message
        );
        setError("Error adding recruitment");
      }
    },
    [getToken]
  );

  const editRecruitment = useCallback(
    async (edtRecruitment) => {
      const token = await getToken();
      if (!token) {
        setError("No token available");
        return;
      }

      try {
        const response = await authApi(token).patch(
          endpoints.RecruitmentDetail.replace(":id", postId),
          edtRecruitment,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setRecruitment(response.data);
      } catch (err) {
        console.error("Error updating recruitment", err);
        toast.error("Failed to update recruitment.");
      }
    },
    [getToken, postId]
  );

  const addApplyJob = useCallback(
    async (applyJob, postId) => {
      const token = await getToken();
      if (!token) return;

      if (!postId) {
        console.error("postId is required");
        toast.error("postId is required");
        return;
      }

      try {
        const url = endpoints.ApplyJob.replace(":id", postId);
        const formData = new FormData();
        formData.append("job_title", applyJob.job_title);
        formData.append("fullname", applyJob.fullname);
        formData.append("phone_number", applyJob.phone_number);
        formData.append("email", applyJob.email);
        formData.append("sex", applyJob.sex);
        formData.append("age", applyJob.age);

        if (applyJob.cv) {
          formData.append("cv", applyJob.cv);
        }

        await authApi(token).post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Đã ứng tuyển thành công!");
      } catch (error) {
        const errorData = error.response?.data || {};
        toast.error(
          `Lỗi khi ứng tuyển việc: ${errorData.detail || error.message}`
        );
        setError(errorData.detail || "Error applying for job");
      }
    },
    [getToken]
  );

  return {
    recruitments,
    loading,
    error,
    recruitment,
    handleDeleteRecruitment,
    addRecruitment,
    editRecruitment,
    addApplyJob,
    fetchRecruitments,
    fetchRecruitment,
  };
};

export default useRecruitment;
