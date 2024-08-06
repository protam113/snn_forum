import { useState, useEffect, useCallback } from "react";
import useAuth from "./useAuth";
import { authApi, endpoints } from "../api/api";

const useRecruitment = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getToken } = useAuth();

  const fetchRecruitments = useCallback(async () => {
    const token = await getToken();
    try {
      const response = await authApi(token ? token : undefined).get(
        endpoints.Recruitment
      );
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
      console.error("Error fetching recruitments", error);
      setError("Error fetching recruitments");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchRecruitments();
  }, [fetchRecruitments]);

  return { recruitments, loading, error };
};

export default useRecruitment;
