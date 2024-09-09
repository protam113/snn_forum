import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useBlog = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentChild, setCommentChild] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { getToken } = useAuth();

  const commentChildrenCache = useRef({});

  const fetchCommentChildren = useCallback(async (commentId) => {
    if (!commentId) return;

    if (commentChildrenCache.current[commentId]) {
      return;
    }

    try {
      const url = endpoints.CmtBlogReply.replace(":id", commentId);
      const response = await authApi().get(url);
      const childComments = response.data.results || [];

      setCommentChild((prevChildren) => {
        const existingCommentIds = new Set(
          prevChildren.map((child) => child.id)
        );
        const newChildComments = childComments.filter(
          (child) => !existingCommentIds.has(child.id)
        );

        commentChildrenCache.current[commentId] = newChildComments;

        return [...prevChildren, ...newChildComments];
      });
    } catch (error) {
      console.error("Error fetching child comments:", error);
      setError("Error fetching child comments");
    }
  }, []);

  // Chỉ tải bình luận con khi người dùng yêu cầu
  const handleExpandComment = (commentId) => {
    fetchCommentChildren(commentId);
  };

  // Handle like/unlike
  const handleLike = useCallback(
    async (blogId, isLiked) => {
      setError(null);

      const token = await getToken();
      if (!token) return;

      const newLikedStatus = !isLiked;
      try {
        const url = endpoints.LikeBlog.replace(":id", blogId);
        let response;

        if (newLikedStatus) {
          // Nếu chưa like, gọi API POST để like
          response = await authApi(token).post(url);
        } else {
          // Nếu đã like, gọi API DELETE để unlike
          response = await authApi(token).delete(url);
        }

        if (response.status >= 200 && response.status < 300) {
          // Thành công
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error(
          "Error handling like/unlike:",
          error.response?.data || error.message
        );
        setError("Error handling like/unlike");
      }
    },
    [getToken]
  );

  // Handle delete blog

  const handleDeleteBlog = async (blogId) => {
    try {
      const token = await getToken();
      if (!token) return;

      await authApi(token).delete(endpoints.DeleteBlog.replace(":id", blogId));

      const page = 1;
      const cacheKey = `blogs_page_${page}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const parsedData = decryptData(cachedData);
        const updatedBlogs = parsedData.blogs.filter(
          (blog) => blog.id !== blogId
        );

        const encryptedData = encryptData({
          ...parsedData,
          blogs: updatedBlogs,
        });
        localStorage.setItem(cacheKey, encryptedData);
      }
    } catch (error) {
      console.error("Lỗi khi xóa blog:", error);
    }
  };

  // Handle delete comment
  const handleDeleteComment = useCallback(
    async (commentId) => {
      const token = await getToken();
      if (!token) return;

      try {
        await authApi(token).delete(endpoints.DelCmt.replace(":id", commentId));
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      } catch (error) {
        console.error("Error deleting comment", error);
        setError("Error deleting comment");
      }
    },
    [getToken]
  );

  const handleEditComment = useCallback(
    async (commentId, updatedContent) => {
      const token = await getToken();
      if (!token) return;

      try {
        const response = await authApi(token).patch(
          endpoints.DelCmt.replace(":id", commentId),
          { content: updatedContent }
        );

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? response.data : comment
          )
        );
        toast.success("Comment edited successfully!");
      } catch (error) {
        console.error("Error editing comment", error);
        toast.error("Failed to edit comment.");
        setError("Error editing comment");
      }
    },
    [getToken]
  );

  // Handle add comment
  const handleAddComment = useCallback(
    async (blogId, contentData, parentId) => {
      try {
        const token = await getToken();
        if (!token || !blogId) return;

        const api = authApi(token);
        const formData = new FormData();
        formData.append("content", contentData.content);
        if (contentData.file) {
          formData.append("file", contentData.file);
        }
        if (parentId) {
          formData.append("parent", parentId);
        }

        await api.post(endpoints.CmtBlog.replace(":id", blogId), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment", error);
        toast.error("Failed to add comment.");
      }
    },
    [getToken]
  );

  // Handle submit blog
  const handleSubmitBlog = useCallback(
    async (
      event,
      content,
      description,
      visibility,
      selectedFiles,
      fileType,
      onClose,
      onSuccess
    ) => {
      event.preventDefault();
      setSubmitting(true);

      try {
        const token = await getToken();
        const formData = new FormData();
        formData.append("content", content);
        formData.append("description", description);
        formData.append("visibility", visibility);
        formData.append("file_type", fileType);

        selectedFiles.forEach((file) => {
          formData.append("media", file);
        });

        const response = await authApi(token).post(endpoints.Blog, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Blog created successfully!");
        onSuccess(response.data);
        onClose();
      } catch (err) {
        console.error("Error creating blog", err);
        toast.error("Failed to create blog.");
      } finally {
        setSubmitting(false);
      }
    },
    [getToken]
  );

  const updateLocalStorage = (updatedBlog) => {
    const cacheKey = "blogs";
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsedData = decryptData(cachedData);
        if (!parsedData || !Array.isArray(parsedData.blogs)) {
          throw new Error("Dữ liệu trong localStorage không hợp lệ");
        }

        const updatedBlogs = parsedData.blogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        );

        const encryptedData = encryptData({
          blogs: updatedBlogs,
          likedBlogs: parsedData.likedBlogs || {},
        });

        localStorage.setItem(cacheKey, encryptedData);
      } catch (localStorageError) {
        console.error(
          "Lỗi khi cập nhật localStorage:",
          localStorageError.message
        );
        throw new Error("Không thể cập nhật dữ liệu trong localStorage");
      } finally {
        setSubmitting(false);
      }
    } else {
      console.warn(
        "Không tìm thấy dữ liệu trong localStorage với key:",
        cacheKey
      );
    }
  };

  return {
    likedBlogs,
    error,
    comments,
    commentChild,
    submitting,
    fileInputRef,
    handleLike,
    handleDeleteBlog,
    handleDeleteComment,
    handleAddComment,
    handleSubmitBlog,
    setSubmitting,
    handleEditComment,
    handleExpandComment,
  };
};

export default useBlog;
