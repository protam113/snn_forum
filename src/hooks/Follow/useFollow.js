// hooks/useFollow.js
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useToastDesign } from "../../context/ToastService";
import { useEffect, useState } from "react";

const toggleFollowUser = async (personId, token, isFollowing) => {
  if (!token) throw new Error("No token available");

  try {
    const endpoint = endpoints.FollowUser.replace(":id", personId);
    const method = isFollowing ? "post" : "post";
    const response = await authApi(token)[method](endpoint);

    if (!response.data) {
      throw new Error("No data received from server");
    }

    return response.data;
  } catch (err) {
    console.error("Error when toggling follow:", err);
    throw err;
  }
};

const useFollowUser = () => {
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ personId, isFollowing }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("Unable to retrieve token");
      }
      return toggleFollowUser(personId, token, isFollowing);
    },
    onSuccess: (data, variables) => {
      const message = variables.isFollowing
        ? "Unfollow thành công!"
        : "Follow thành công!";
      addNotification(message, "success");
      queryClient.invalidateQueries(["followers"]);
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi thao tác!", "error");
      console.error(error.message || "Lỗi khi thao tác!");
    },
  });

  return mutation;
};

const fetchFollower = async ({ pageParam = 1, token }) => {
  try {
    // Thực hiện truy vấn API
    const response = await authApi(token).get(
      `${endpoints.Follower}?page=${pageParam}`
    );

    // Lấy dữ liệu từ phản hồi API
    const results = response.data.results || [];
    const next = response.data.next;

    // Trả về dữ liệu đã sắp xếp
    return {
      Follower: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (err) {
    console.error("Lỗi khi lấy danh sách follower:", err);
    throw new Error("Failed to fetch follower");
  }
};

const useFollowerList = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
      setIsReady(true);
    };
    fetchToken();
  }, [getToken]);

  return useInfiniteQuery({
    queryKey: ["followers", token],
    queryFn: ({ pageParam }) => fetchFollower({ pageParam, token }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(isReady && token), // Chuyển giá trị thành boolean
    staleTime: 60000,
  });
};

const fetchFollowing = async ({ pageParam = 1, token }) => {
  try {
    // Thực hiện truy vấn API
    const response = await authApi(token).get(
      `${endpoints.Following}?page=${pageParam}`
    );

    // Lấy dữ liệu từ phản hồi API
    const results = response.data.results || [];
    const next = response.data.next;

    // Trả về dữ liệu đã sắp xếp
    return {
      Follower: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (err) {
    console.error("Lỗi khi lấy danh sách follower:", err);
    throw new Error("Failed to fetch follower");
  }
};

const useFollowingList = () => {
  const { getToken } = useAuth();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
      setIsReady(true);
    };
    fetchToken();
  }, [getToken]);

  return useInfiniteQuery({
    queryKey: ["followings", token],
    queryFn: ({ pageParam }) => fetchFollowing({ pageParam, token }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(isReady && token), // Chuyển giá trị thành boolean
    staleTime: 60000,
  });
};

export { useFollowUser, useFollowerList, useFollowingList };
