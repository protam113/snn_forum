// hooks/useChat.js
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { authApi, endpoints } from "../../api/api";
import useAuth from "../useAuth";
import { useEffect, useState } from "react";
import { useToastDesign } from "../../context/ToastService";

const FetchBGroupList = async ({ pageParam = 1, token }) => {
  try {
    // Thực hiện truy vấn API
    const response = await authApi(token).get(
      `${endpoints.GroupChat}?page=${pageParam}`
    );

    // Lấy dữ liệu từ phản hồi API
    const results = response.data.results || [];
    const next = response.data.next;

    // Trả về dữ liệu đã sắp xếp
    return {
      GroupChats: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (err) {
    console.error("Lỗi khi lấy danh sách group:", err);
    throw new Error("Failed to fetch blogs");
  }
};

const useGroupList = () => {
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
    queryKey: ["groupChat", token],
    queryFn: ({ pageParam }) => FetchBGroupList({ pageParam, token }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(isReady && token), // Chuyển giá trị thành boolean
    staleTime: 60000,
  });
};

const fetchGroupUserList = async ({ pageParam = 1, token, groupId }) => {
  if (!groupId) {
    throw new Error("No groupId provided");
  }

  try {
    const url = endpoints.GroupChatMember.replace(":id", groupId);

    const response = await authApi(token).get(url);
    const results = response.data.results || [];
    const next = response.data.next;

    return {
      users: results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      ),
      nextPage: next ? pageParam + 1 : null,
    };
  } catch (err) {
    console.error("Error fetching user list:", err);
    throw new Error("Failed to fetch users");
  }
};

const useGroupUserList = (groupId) => {
  const { getToken } = useAuth();
  const [isReady, setIsReady] = useState(false);

  const query = useInfiniteQuery({
    queryKey: ["users", groupId],
    queryFn: async ({ pageParam }) => {
      const token = await getToken();
      return fetchGroupUserList({ pageParam, token, groupId });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: isReady,
    staleTime: 60000,
  });

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setIsReady(true);
      }
    };
    fetchToken();
  }, [getToken]);

  return query;
};

const addUserInGroup = async (groupId, userIds, token) => {
  if (!token) throw new Error("No token available");

  try {
    const endpoint = endpoints.GroupChatMember.replace(":id", groupId); // Thay thế :groupId với groupId thực tế

    // Tạo đối tượng FormData
    const formData = new FormData();

    // Thêm từng user_id vào formData
    userIds.forEach((userId) => {
      formData.append("user_id", userId); // Mỗi user_id được thêm vào
    });

    const response = await authApi(token).post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (err) {
    console.error("Lỗi khi thêm người dùng:", err);
    throw err;
  }
};

const useAddUserInGroup = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ groupId, userIds }) => {
      const token = await getToken();
      return addUserInGroup(groupId, userIds, token);
    },
    onSuccess: () => {
      addNotification("Người dùng đã được thêm thành công", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi thêm người dùng!", "error");
      console.error(error.message || "Lỗi khi thêm người dùng!");
    },
  });
};

const removeUserFromGroup = async (groupId, userIds, token) => {
  if (!token) throw new Error("No token available");

  try {
    const endpoint = endpoints.GroupChatMember.replace(":id", groupId); // Thay thế :groupId với groupId thực tế

    // Tạo đối tượng FormData
    const formData = new FormData();

    // Thêm từng user_id vào formData
    userIds.forEach((userId) => {
      formData.append("user_id_remove", userId); // Mỗi user_id được thêm vào
    });

    const response = await authApi(token).post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (err) {
    console.error("Lỗi khi thoát khỏi nhóm:", err);
    throw err;
  }
};

const useRemoveUserFromGroup = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ groupId, userIds }) => {
      const token = await getToken();
      return removeUserFromGroup(groupId, userIds, token);
    },
    onSuccess: () => {
      addNotification("Người dùng đã thoát khỏi nhóm", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi thoát khỏi nhóm!", "error");
      console.error(error.message || "Lỗi khi thoát khỏi nhóm!");
    },
  });
};

const AddGroup = async (newGroup, token) => {
  console.log("Received Group Data:", newGroup);

  if (!token) throw new Error("No token available");

  const formData = new FormData();
  formData.append("name", newGroup.name);
  formData.append("image", newGroup.image);

  try {
    const response = await authApi(token).post(endpoints.GroupChat, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while adding group:", error);
    throw error;
  }
};

const useAddGroup = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async (newGroup) => {
      const token = await getToken();
      return AddGroup(newGroup, token);
    },
    onSuccess: () => {
      addNotification("Group đã được thêm thành công", "success");
      queryClient.invalidateQueries(["groupChat"]);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add Group.";
      addNotification(errorMessage, "error");
    },
  });
};

const deleteGroupChat = async ({ groupId, token }) => {
  if (!token) throw new Error("No token available");
  if (!groupId) throw new Error("groupId is missing");

  try {
    await authApi(token).delete(
      endpoints.GroupChatDetail.replace(":id", groupId)
    );
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa xóa nhóm.");
    throw error;
  }
};

const useDeleteGroupChat = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ groupId }) => {
      const token = await getToken();
      return deleteGroupChat({ groupId, token });
    },
    onSuccess: () => {
      addNotification("groupId đã được xóa thành công", "success");
      queryClient.invalidateQueries(["groupChat"]);
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi xóa groupId!", "error");
    },
  });
};

// Hàm để thoát khỏi nhóm
const leaveGroup = async (groupId, token) => {
  if (!token) throw new Error("No token available");
  if (!groupId) throw new Error("groupId is missing");
  console.log("Token for leaving group:", token);

  try {
    await authApi(token).delete(
      endpoints.GroupChatMember.replace(":id", groupId)
    );
  } catch (error) {
    console.error("Đã xảy ra lỗi khi thoát nhóm.");
    throw error;
  }
};

// Hook for leaving the group
// Hook for leaving the group
const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const { addNotification } = useToastDesign();

  return useMutation({
    mutationFn: async ({ groupId }) => {
      const token = await getToken();
      console.log("Token retrieved for leaving group:", token);
      return leaveGroup(groupId, token);
    },
    onSuccess: () => {
      addNotification("Bạn đã rời nhóm thành công", "success");
      queryClient.invalidateQueries(["users"]); // Update relevant queries
    },
    onError: (error) => {
      addNotification(error.message || "Lỗi khi thoát nhóm!", "error");
    },
  });
};

export {
  useGroupList,
  useAddUserInGroup,
  useAddGroup,
  useGroupUserList,
  useDeleteGroupChat,
  useLeaveGroup,
  useRemoveUserFromGroup,
};
