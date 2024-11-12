// hooks/useFollow.js
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useEffect, useState } from "react";

const useFollowUser = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ personId, isFollowing }) => {
      const token = await getToken();
      if (!token) throw new Error("No token available");

      const url = endpoints.FollowUser.replace(":id", personId);
      try {
        let response;

        // Nếu đang theo dõi thì gọi API xóa (unfollow), ngược lại là thêm (follow)
        if (isFollowing) {
          response = await authApi(token).delete(url); // Unfollow
        } else {
          response = await authApi(token).post(url); // Follow
        }

        // Kiểm tra phản hồi từ API
        if (response.status >= 200 && response.status < 300) {
          return !isFollowing; // Trả về trạng thái mới
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error handling follow/unfollowed:", error);
        throw error; // Để xử lý lỗi bên ngoài
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["followers"]); // Làm mới danh sách followers
    },
    onError: (error) => {
      console.error(error.message || "Lỗi khi xử lý follow/unfollowed!");
    },
  });
};

const fetchFollower = async ({ pageParam = 1, token, personId, sortBy }) => {
  try {
    // Thực hiện truy vấn API với tham số sort_by
    const response = await authApi(token).get(
      `${endpoints.Follower.replace(
        ":id",
        personId
      )}?page=${pageParam}&sort_by=${sortBy}`
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

const useFollowerList = (personId, sortBy) => {
  // Thêm sortBy vào đây
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
    queryKey: ["followers", personId, token, sortBy], // Cập nhật queryKey để bao gồm sortBy
    queryFn: ({ pageParam = 1 }) =>
      fetchFollower({ pageParam, token, personId, sortBy }), // Truyền sortBy vào fetchFollower
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(isReady && token && personId), // Đảm bảo rằng cả token và personId đều có giá trị
    staleTime: 60000,
  });
};

const fetchFollowing = async ({ pageParam = 1, token, personId, sortBy }) => {
  try {
    // Thực hiện truy vấn API
    const response = await authApi(token).get(
      `${endpoints.Following.replace(
        ":id",
        personId
      )}?page=${pageParam}&sort_by=${sortBy}`
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

const useFollowingList = (personId, sortBy) => {
  // Thêm sortBy vào đây
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
    queryKey: ["followings", personId, token, sortBy], // Cập nhật queryKey
    queryFn: ({ pageParam }) =>
      fetchFollowing({ pageParam, token, personId, sortBy }), // Thêm sortBy vào queryFn
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(isReady && token && personId),
    staleTime: 60000,
  });
};

export { useFollowUser, useFollowerList, useFollowingList };
