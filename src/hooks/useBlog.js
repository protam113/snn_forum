import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useBlog = (blogId) => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [likeListVisible, setLikeListVisible] = useState(false);
  const fileInputRef = useRef(null);

  const { getToken, refreshAuthToken } = useAuth();

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    const token = await getToken();
    try {
      const response = await authApi(token ? token : undefined).get(
        endpoints.Blog
      );
      const results = response.data.results;

      if (!Array.isArray(results)) {
        throw new Error("Results is not an array");
      }

      const sortedBlogs = results.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setBlogs(sortedBlogs);

      if (token) {
        setLikedBlogs(
          sortedBlogs.reduce((acc, blog) => {
            acc[blog.id] = blog.liked || false;
            return acc;
          }, {})
        );
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
      setError("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  // Fetch blog details and comments
  const fetchBlog = useCallback(async () => {
    if (!blogId) return;

    try {
      const url = endpoints.BlogDetail.replace(":id", blogId);
      const response = await authApi().get(url); // Removed token
      setBlog(response.data.blog);
      setComments(response.data.comments.results || []);
    } catch (error) {
      console.error("Error fetching blog details", error);
      setError("Error fetching blog details");
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  // Fetch current user
  const fetchCurrentUser = useCallback(async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const response = await authApi(token).get(endpoints.currentUser);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user", error);
    }
  }, [getToken]);

  // Fetch blog likes
  const getBlogLikes = useCallback(
    async (blogId) => {
      const token = await getToken();
      if (!token) return [];

      try {
        const url = endpoints.LikeBlog.replace(":id", blogId);
        const response = await authApi(token).get(url);
        return response.data.results || [];
      } catch (error) {
        console.error("Error fetching likes", error);
        throw error;
      }
    },
    [getToken]
  );

  // Fetch blog details
  useEffect(() => {
    fetchBlogs();
    fetchBlog();
    fetchCurrentUser();
  }, [fetchBlogs, fetchBlog, fetchCurrentUser]);

  useEffect(() => {
    if (blogId) {
      getBlogLikes(blogId).then(setLikeList).catch(console.error);
    }
  }, [blogId, getBlogLikes]);

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
        if (newLikedStatus) {
          await authApi(token).post(url);
        } else {
          await authApi(token).delete(url);
        }
      } catch (error) {
        console.error("Error handling like/unlike", error);
        setError("Error handling like/unlike");
        setLikedBlogs((prevState) => ({
          ...prevState,
          [blogId]: !newLikedStatus,
        }));
      }
    },
    [likedBlogs, getToken]
  );

  // Handle delete blog
  const handleDeleteBlog = useCallback(
    async (blogId) => {
      const token = await getToken();
      if (!token) return;

      try {
        const blog = blogs.find((blog) => blog.id === blogId);
        if (!blog || blog.user.username !== currentUser?.username) {
          setError("You are not authorized to delete this blog.");
          return;
        }

        const url = endpoints.EdtBlog.replace(":id", blogId);
        await authApi(token).delete(url);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      } catch (error) {
        console.error("Error deleting blog", error);
        setError("Error deleting blog");
      }
    },
    [blogs, currentUser, getToken]
  );

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

  // Handle add comment
  const handleAddComment = useCallback(async (blogId, contentData, file) => {
    try {
      const token = await getToken();
      if (!token || !blogId) return;

      const api = authApi(token);
      const formData = new FormData();
      formData.append("content", contentData.content);
      if (contentData.file) {
        formData.append("file", contentData.file);
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
  }, []);

  // Handle submit blog
  const handleSubmitBlog = useCallback(
    async (event, content, description, visibility, onClose, onSuccess) => {
      event.preventDefault();
      setSubmitting(true);

      try {
        const token = await getToken();
        const formData = new FormData();
        formData.append("content", content);
        formData.append("description", description);
        formData.append("visibility", visibility);

        if (fileInputRef.current?.files.length > 0) {
          Array.from(fileInputRef.current.files).forEach((file) => {
            formData.append("media", file);
          });
        }

        try {
          await authApi(token).post(endpoints.Blog, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          toast.success("Blog created successfully!");
          onSuccess();
          onClose();
        } catch (err) {
          if (err.response?.status === 401) {
            const newToken = await refreshAuthToken();
            if (newToken) {
              await authApi(newToken).post(endpoints.Blog, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              toast.success("Blog created successfully!");
              onSuccess();
              onClose();
            } else {
              toast.error("Failed to refresh token");
            }
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error("Error creating blog", err);
        toast.error("Failed to create blog.");
      } finally {
        setSubmitting(false);
      }
    },
    [getToken, refreshAuthToken]
  );

  // Handle edit blog
  const editBlog = useCallback(
    async (blogId, content, description, visibility, file) => {
      const token = await getToken();
      if (!token) return;

      try {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("description", description);
        formData.append("visibility", visibility);

        if (file) {
          formData.append("media", file);
        }

        await authApi(token).patch(
          endpoints.EdtBlog.replace(":id", blogId),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        toast.success("Blog updated successfully!");
        fetchBlog(blogId); // Refresh blog details after update
      } catch (error) {
        console.error("Error updating blog", error);
        toast.error("Failed to update blog.");
      }
    },
    [getToken, fetchBlog]
  );

  return {
    blogs,
    blog,
    likedBlogs,
    loading,
    error,
    comments,
    submitting,
    likeList,
    likeListVisible,
    fileInputRef,
    handleLike,
    handleDeleteBlog,
    handleDeleteComment,
    handleAddComment,
    handleSubmitBlog,
    editBlog,
    setLikeListVisible,
    setSubmitting,
  };
};

export default useBlog;
