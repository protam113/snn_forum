import { authApi, endpoints } from "../api/api";
import { useState, useEffect, useCallback } from "react";
import useDebounce from "./useDebounce";

const useUserSearch = (searchTerm, delay = 500) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = endpoints.createUser;
      const response = await authApi().get(url);
      setResults(response.data.results);
    } catch (err) {
      console.error("Lỗi khi tìm kiếm người dùng:", err);
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
          const url = `${endpoints.createUser}?search=${debouncedSearchTerm}`;
          const response = await authApi().get(url);
          setResults(response.data.results);
        } catch (err) {
          console.error("Lỗi khi tìm kiếm người dùng:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      searchUsers();
    } else {
      fetchUsers();
    }
  }, [debouncedSearchTerm, fetchUsers]);

  return { results, loading, error, fetchUsers };
};

export default useUserSearch;
