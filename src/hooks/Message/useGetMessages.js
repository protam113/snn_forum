import { useQuery } from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";

const useGetMessages = (personId, page = 1) => {
  const { getToken } = useAuth();

  const fetchMessages = async () => {
    const token = getToken();
    const url = `${endpoints.Chatting}?user_id=${personId}&page=${page}`;
    const response = await authApi(token).get(url);
    return response.data.results || [];
  };

  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["messages", personId, page],
    queryFn: fetchMessages,
    enabled: !!personId,
    staleTime: 1000 * 60 * 5,
  });

  return { messages, isLoading, isError, refetch };
};

export default useGetMessages;
