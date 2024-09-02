import { authApi, endpoints } from "../api/api";
import { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";

const useUserSearch = (searchTerm, searchField = "username", delay = 500) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const buildSearchUrl = (baseURL, searchTerm, searchField) => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append(searchField, searchTerm);
    }

    return `${baseURL}?${params.toString()}`;
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = endpoints.createUser;
      const response = await authApi().get(url);
      setResults(response.data.results);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
          const url = buildSearchUrl(
            endpoints.createUser,
            debouncedSearchTerm,
            searchField
          );
          const response = await authApi().get(url);
          setResults(response.data.results);
        } catch (err) {
          console.error("Error searching users:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      searchUsers();
    } else {
      fetchUsers();
    }
  }, [debouncedSearchTerm, searchField, fetchUsers]);

  return { results, loading, error, fetchUsers };
};

export default useUserSearch;
