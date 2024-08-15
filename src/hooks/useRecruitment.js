import { useState, useEffect, useCallback } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useRecruitment = (postId) => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recruitment, setRecruitment] = useState(null);
  const { getToken, refreshAuthToken } = useAuth();

  const fetchRecruitments = useCallback(async () => {
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
    } catch (error) {
      console.error("Error fetching recruitments:", error);
      setError("Error fetching recruitments");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecruitment = useCallback(async () => {
    if (!postId) return;

    try {
      const url = endpoints.RecruitmentDetail.replace(":id", postId);
      const response = await authApi().get(url);

      // Directly use the response.data as the recruitment object
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

        // Remove the deleted recruitment from the state
        setRecruitments((prevRecruitments) =>
          prevRecruitments.filter((recruitment) => recruitment.id !== postId)
        );

        // Optionally, clear the recruitment detail if the deleted recruitment was the one being viewed
        if (recruitment && recruitment.id === postId) {
          setRecruitment(null);
        }
      } catch (error) {
        console.error("Error deleting recruitment:", error);
        setError("Error deleting recruitment");
      }
    },
    [getToken, postId, recruitment]
  );

  const addRecruitment = useCallback(
    async (newRecruitment) => {
      const token = await getToken();
      if (!token) return;

      try {
        // Log data to verify its structure
        console.log("Sending data:", newRecruitment);

        const response = await authApi(token).post(
          endpoints.Recruitment,
          newRecruitment
        );

        // Log API response
        console.log("API response:", response.data);

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

  useEffect(() => {
    fetchRecruitments();
    fetchRecruitment();
  }, [fetchRecruitments, fetchRecruitment]);

  return {
    recruitments,
    loading,
    error,
    recruitment,
    handleDeleteRecruitment,
    addRecruitment,
  };
};

export default useRecruitment;
