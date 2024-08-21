import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useAdmin = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { getToken } = useAuth();
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all groups
  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await authApi(token).get(endpoints.GroupList);
      const results = response.data.results;
      setGroups(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy danh sách nhóm");
      toast.error("Đã xảy ra lỗi khi lấy danh sách nhóm");
    } finally {
      setLoadingGroups(false);
    }
  }, [getToken]);

  // Fetch all users
  const fetchAllUsers = useCallback(async () => {
    setLoadingUsers(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await authApi(token).get(endpoints.GroupAllUser);
      const results = response.data.results;
      setUsers(results);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy danh sách người dùng");
      toast.error("Đã xảy ra lỗi khi lấy danh sách người dùng");
    } finally {
      setLoadingUsers(false);
    }
  }, [getToken]);

  // Fetch users in a specific group
  const fetchUsersInGroup = useCallback(
    async (groupId) => {
      setLoadingUsers(true);
      setError(null);
      try {
        const token = await getToken();
        const url = endpoints.GroupUser.replace(":id", groupId);
        const response = await authApi(token).get(url);
        const results = response.data.results;
        setUsers(results);
      } catch (err) {
        setError("Đã xảy ra lỗi khi lấy người dùng trong nhóm");
        toast.error("Đã xảy ra lỗi khi lấy người dùng trong nhóm");
      } finally {
        setLoadingUsers(false);
      }
    },
    [getToken]
  );

  // Add user to group
  const addUserToGroup = async (groupId, userId) => {
    setError(null);
    try {
      const token = await getToken();
      const url = endpoints.AddUser.replace(":id", groupId);
      const formData = new FormData();
      formData.append("id", userId);
      const response = await authApi(token).post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Người dùng đã được thêm vào nhóm thành công");
      if (selectedGroup) {
        fetchUsersInGroup(selectedGroup.id);
      } else {
        fetchAllUsers();
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi thêm người dùng vào nhóm");
      toast.error("Đã xảy ra lỗi khi thêm người dùng vào nhóm");
    }
  };

  const removeUserFromGroup = async (userId, groupId) => {
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
      if (selectedGroup) {
        fetchUsersInGroup(selectedGroup.id);
      } else {
        fetchAllUsers();
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi gỡ người dùng khỏi nhóm");
      toast.error("Đã xảy ra lỗi khi gỡ người dùng khỏi nhóm");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  useEffect(() => {
    if (selectedGroup) {
      fetchUsersInGroup(selectedGroup.id);
    } else {
      fetchAllUsers();
    }
  }, [fetchAllUsers, fetchUsersInGroup, selectedGroup]);

  return {
    groups,
    users,
    loadingGroups,
    loadingUsers,
    selectedGroup,
    error,
    setSelectedGroup,
    addUserToGroup,
    removeUserFromGroup,
  };
};

export default useAdmin;
