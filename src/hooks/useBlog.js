import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";
import { encryptData, decryptData } from "../utils/cryptoUtils";

const useBlog = (blogId) => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentChild, setCommentChild] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fileInputRef = useRef(null);
  const { getToken } = useAuth();

  // Fetch all blogs
  const fetchBlogs = useCallback(
    async (page = 1) => {
      setLoading(true);
      const token = await getToken();
      const cacheKey = `blogs_page_${page}`;
      const cacheTimeKey = `${cacheKey}_time`;
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(cacheTimeKey);

      const now = new Date().getTime();
      const cacheDuration = 60 * 1000; // 1 minute cache duration

      let newBlogs = [];
      let newLikedBlogs = {};

      // Check if we have cached data
      if (
        cachedData &&
        cachedTime &&
        now - parseInt(cachedTime) < cacheDuration
      ) {
        const parsedData = decryptData(cachedData);
        newBlogs = parsedData.blogs || [];
        newLikedBlogs = parsedData.likedBlogs || {};
      } else {
        try {
          const response = await authApi(token).get(
            `${endpoints.Blog}?page=${page}`
          );
          const results = response.data.results || [];
          const next = response.data.next; // Check if there's a next page

          if (!Array.isArray(results)) {
            throw new Error("Results is not an array");
          }

          newBlogs = results.sort(
            (a, b) => new Date(b.created_date) - new Date(a.created_date)
          );

          newLikedBlogs = token
            ? newBlogs.reduce((acc, blog) => {
                acc[blog.id] = blog.liked || false;
                return acc;
              }, {})
            : {};

          const encryptedData = encryptData({
            blogs: newBlogs,
            likedBlogs: newLikedBlogs,
          });
          localStorage.setItem(cacheKey, encryptedData);
          localStorage.setItem(cacheTimeKey, now.toString());

          // Determine if there are more blogs to load
          setHasMore(!!response.data.next); // Set hasMore based on whether there is a next page
        } catch (error) {
          console.error(
            "Error fetching blogs:",
            error.response?.data || error.message
          );
          setError("Error fetching blogs");
        }
      }

      setBlogs((prevBlogs) => {
        const existingIds = new Set(prevBlogs.map((blog) => blog.id));
        const filteredNewBlogs = newBlogs.filter(
          (blog) => !existingIds.has(blog.id)
        );
        return [...prevBlogs, ...filteredNewBlogs];
      });

      setLikedBlogs((prevLikedBlogs) => ({
        ...prevLikedBlogs,
        ...newLikedBlogs,
      }));

      setLoading(false);
      return newBlogs; // Always return an array
    },
    [getToken]
  );

  // Fetch blog details
  const fetchBlog = useCallback(async () => {
    if (!blogId) return;

    setLoading(true);

    try {
      const token = await getToken();
      const url = endpoints.BlogDetail.replace(":id", blogId);

      const response = token
        ? await authApi(token).get(url)
        : await authApi().get(url);

      const blogData = response.data;

      const likedByUser = token ? blogData.liked || false : false;

      setBlog({ ...blogData, likedByUser });
    } catch (error) {
      setError("Error fetching blog details. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [blogId, getToken]);

  const fetchComments = useCallback(async () => {
    if (!blogId) return;

    try {
      const url = endpoints.CmtBlog.replace(":id", blogId);
      const response = await authApi().get(url);
      const commentsData = response.data.results || [];

      const commentsByParent = {};
      const parentComments = [];

      commentsData.forEach((comment) => {
        if (comment.parent === null) {
          parentComments.push(comment);
        } else {
          if (!commentsByParent[comment.parent]) {
            commentsByParent[comment.parent] = [];
          }
          commentsByParent[comment.parent].push(comment);
        }
      });

      const organizedComments = parentComments.map((parentComment) => ({
        ...parentComment,
        children: commentsByParent[parentComment.id] || [],
      }));

      setComments(organizedComments);
      setCommentChild(
        commentsData.filter((comment) => comment.parent !== null)
      ); // Lưu bình luận con
    } catch (error) {
      console.error("Error fetching comments", error);
      setError("Error fetching comments");
    }
  }, [blogId]);

  const commentChildrenCache = useRef({}); // Sử dụng useRef để lưu trữ các comment con đã được tải

  const fetchCommentChildren = useCallback(async (commentId) => {
    if (!commentId) return;

    // Kiểm tra nếu dữ liệu đã được tải và lưu trữ
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

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId, fetchComments]);

  // Chỉ tải bình luận con khi người dùng yêu cầu
  const handleExpandComment = (commentId) => {
    fetchCommentChildren(commentId);
  };

  // Handle like/unlike
  const handleLike = useCallback(
    async (blogId, e) => {
      e.stopPropagation();
      setError(null);

      const token = await getToken();
      if (!token) return;

      const newLikedStatus = !likedBlogs[blogId];
      setLikedBlogs((prevState) => ({
        ...prevState,
        [blogId]: newLikedStatus,
      }));

      try {
        const url = endpoints.LikeBlog.replace(":id", blogId);
        let response;

        if (newLikedStatus) {
          // Like the blog
          response = await authApi(token).post(url);
        } else {
          // Unlike the blog
          response = await authApi(token).delete(url);
        }

        // Check if the response is successful
        if (response.status >= 200 && response.status < 300) {
          // Optionally update local cache or state here
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error(
          "Error handling like/unlike:",
          error.response?.data || error.message
        );
        setError("Error handling like/unlike");
        // Revert the like status on error
        setLikedBlogs((prevState) => ({
          ...prevState,
          [blogId]: !newLikedStatus,
        }));
      }
    },
    [likedBlogs, getToken]
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

  const editBlog = useCallback(
    async (data) => {
      try {
        const token = await getToken();
        if (!token) {
          setError("No token available");
          return;
        }

        if (!blogId || isNaN(blogId)) {
          console.error("Invalid blogId:", blogId);
          setError("Invalid blogId");
          return;
        }

        const url = endpoints.BlogDetail.replace(":id", blogId);
        console.log("Sending request to URL:", url);

        const response = await authApi(token).patch(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setBlog(response.data);
        try {
          updateLocalStorage(response.data);
        } catch (updateError) {
          setError(updateError.message);
        }
      } catch (err) {
        console.error("Error updating blog", err);
        toast.error("Failed to update blog.");
        setError("Failed to update blog.");
      }
    },
    [blogId, getToken]
  );

  return {
    blogs,
    blog,
    likedBlogs,
    hasMore,
    loading,
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
    editBlog,
    setSubmitting,
    handleEditComment,
    fetchBlogs,
    fetchBlog,
    handleExpandComment,
  };
};

export default useBlog;
