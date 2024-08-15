import { useState, useEffect, useCallback } from "react";
import { authApi, endpoints } from "../api/api";

const useRecruitment = (postId) => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recruitment, setRecruitment] = useState(null);

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

  useEffect(() => {
    fetchRecruitments();
    fetchRecruitment();
  }, [fetchRecruitments, fetchRecruitment]);

  return { recruitments, loading, error, recruitment };
};

export default useRecruitment;
