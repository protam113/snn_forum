import { useState, useEffect, useCallback, useMemo } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { useToastDesign } from "../context/ToastService";

const useAdmin = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState({ groups: false, users: false });
  const [error, setError] = useState(null);
  const { addNotification } = useToastDesign();
  // Fetch all groups
  const fetchGroups = useCallback(async () => {
    setLoading((prev) => ({ ...prev, groups: true }));
    setError(null);
    try {
      const token = await getToken();
      const response = await authApi(token).get(endpoints.GroupList);
      const results = response.data.results || [];
      setGroups(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy danh sách nhóm");
    } finally {
      setLoading((prev) => ({ ...prev, groups: false }));
    }
  }, [getToken]);

  // Fetch all users
  const fetchAllUsers = useCallback(async () => {
    setLoading((prev) => ({ ...prev, users: true }));
    setError(null);
    try {
      const token = await getToken();
      const response = await authApi(token).get(endpoints.GroupAllUser);
      const results = response.data.results || [];
      setUsers(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy danh sách người dùng");
    } finally {
      setLoading((prev) => ({ ...prev, users: false }));
    }
  }, [getToken]);

  // Fetch users in a specific group
  const fetchUsersInGroup = useCallback(
    async (groupId) => {
      setLoading((prev) => ({ ...prev, users: true }));
      setError(null);
      try {
        const token = await getToken();
        const url = endpoints.GroupUser.replace(":id", groupId);
        const response = await authApi(token).get(url);
        const results = response.data.results || [];
        setUsers(results);
      } catch (err) {
        setError("Đã xảy ra lỗi khi lấy người dùng trong nhóm");
      } finally {
        setLoading((prev) => ({ ...prev, users: false }));
      }
    },
    [getToken]
  );

  // Add user to group
  const addUserToGroup = useCallback(
    async (groupId, userId) => {
      setError(null);
      try {
        const token = await getToken();
        const url = endpoints.AddUser.replace(":id", groupId);
        const formData = new FormData();
        formData.append("id", userId);
        await authApi(token).post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        addNotification(
          "Người dùng đã được thêm vào nhóm thành công",
          "success"
        );
        setSelectedGroup((prev) => (prev ? { ...prev, id: groupId } : null));
      } catch (err) {
        setError("Đã xảy ra lỗi khi thêm người dùng vào nhóm");
      }
    },
    [getToken]
  );

  // Remove user from group
  const removeUserFromGroup = useCallback(
    async (userId, groupId) => {
      setError(null);
      try {
        const token = await getToken();
        const url = endpoints.RemoveUser.replace(":id", groupId);
        const formData = new FormData();
        formData.append("id", userId);
        await authApi(token).post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        addNotification(
          "Người dùng đã được gỡ khỏi nhóm thành công",
          "success"
        );
        setSelectedGroup((prev) => (prev ? { ...prev, id: groupId } : null));
      } catch (err) {
        setError("Đã xảy ra lỗi khi gỡ người dùng khỏi nhóm");
      }
    },
    [getToken]
  );

  const UpdateWeb = useCallback(
    async (formData) => {
      setError(null);
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("Token không hợp lệ hoặc không có");
        }

        const response = await authApi().patch(endpoints.web, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        addNotification("Cập nhật web thành công", "success");
        return response.data;
      } catch (error) {
        console.error(
          "Error updating web:",
          error.response ? error.response.data : error.message
        );
        console.error("Đã xảy ra lỗi khi cập nhật web!");
        throw error;
      }
    },
    [getToken]
  );

  // Fetch groups and users based on selected group

  useEffect(() => {
    if (selectedGroup) {
      fetchUsersInGroup(selectedGroup.id);
    } else {
      fetchAllUsers();
    }
  }, [fetchAllUsers, fetchUsersInGroup, selectedGroup]);

  const isLoading = useMemo(() => loading.groups || loading.users, [loading]);

  return {
    groups,
    users,
    loading: isLoading,
    selectedGroup,
    error,
    setSelectedGroup,
    addUserToGroup,
    removeUserFromGroup,
    fetchGroups,
    UpdateWeb,
  };
};

export default useAdmin;
