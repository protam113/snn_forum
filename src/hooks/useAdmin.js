import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useAdmin = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState({ groups: false, users: false });
  const [error, setError] = useState(null);

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
      toast.error("Đã xảy ra lỗi khi lấy danh sách nhóm");
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
      toast.error("Đã xảy ra lỗi khi lấy danh sách người dùng");
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
        toast.error("Đã xảy ra lỗi khi lấy người dùng trong nhóm");
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
        toast.success("Người dùng đã được thêm vào nhóm thành công");
        setSelectedGroup((prev) => (prev ? { ...prev, id: groupId } : null));
      } catch (err) {
        setError("Đã xảy ra lỗi khi thêm người dùng vào nhóm");
        toast.error("Đã xảy ra lỗi khi thêm người dùng vào nhóm");
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
        toast.success("Người dùng đã được gỡ khỏi nhóm thành công");
        setSelectedGroup((prev) => (prev ? { ...prev, id: groupId } : null));
      } catch (err) {
        setError("Đã xảy ra lỗi khi gỡ người dùng khỏi nhóm");
        toast.error("Đã xảy ra lỗi khi gỡ người dùng khỏi nhóm");
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
  };
};

export default useAdmin;
