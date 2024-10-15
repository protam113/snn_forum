import { authApi, endpoints } from "../api/api";
import { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";

const useUserSearch = (searchTerm, searchField = "username", delay = 500) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const buildSearchUrl = useCallback((baseURL, term, field) => {
    const params = new URLSearchParams();
    if (term) params.append(field, term);
    return `${baseURL}?${params.toString()}`;
  }, []);

  const fetchData = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi().get(url);
      setResults(response.data.results);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
      setError(err.response?.data || { message: "Unknown error occurred" });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(() => {
    fetchData(endpoints.createUser);
  }, [fetchData]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const url = buildSearchUrl(
        endpoints.createUser,
        debouncedSearchTerm,
        searchField
      );
      fetchData(url);
    } else {
      fetchUsers();
    }
  }, [debouncedSearchTerm, searchField, fetchUsers, buildSearchUrl, fetchData]);

  return { results, loading, error, fetchUsers };
};

export default useUserSearch;
