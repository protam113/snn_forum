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
  const [comments, setComments] = useState([]); // Bình luận cha
  const [commentChild, setCommentChild] = useState([]); // Bình luận con
  const [currentUser, setCurrentUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [likeListVisible, setLikeListVisible] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const { getToken } = useAuth();

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

  // Fetch blog details
  const fetchBlog = useCallback(async () => {
    if (!blogId) return;

    try {
      const url = endpoints.BlogDetail.replace(":id", blogId);
      const response = await authApi().get(url);
      setBlog(response.data); // Directly setting the blog data
    } catch (error) {
      setError("Error fetching blog details. Please try again later.");
      console.error(error);
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

  // Fetch comments
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

  const fetchCommentChildren = useCallback(async (commentId) => {
    if (!commentId) return;

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
        return [...prevChildren, ...newChildComments];
      });
    } catch (error) {
      console.error("Error fetching child comments:", error);
      setError("Error fetching child comments");
    }
  }, []);

  // Fetch blog details
  useEffect(() => {
    fetchBlogs();
    fetchBlog();
    fetchCurrentUser();
  }, [fetchBlogs, fetchBlog, fetchCurrentUser]);

  useEffect(() => {
    if (blogId) {
      fetchComments();
      getBlogLikes(blogId).then(setLikeList).catch(console.error);
    }
  }, [blogId, fetchComments, getBlogLikes]);

  // Fetch child comments only when comments change
  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((comment) => {
        if (comment.id) {
          fetchCommentChildren(comment.id);
        }
      });
    }
  }, [comments, fetchCommentChildren]);

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
            const newToken = await getToken();
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
    [getToken]
  );

  const editBlog = async (data) => {
    try {
      const token = await getToken();
      if (!token) {
        setError("No token available");
        return;
      }

      // Thực hiện cập nhật blog với token hiện tại
      const response = await authApi(token).patch(
        endpoints.BlogDetail.replace(":id", blogId),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBlog(response.data);
    } catch (err) {
      console.error("Error updating blog", err.response?.data || err.message);
      setError("Error updating blog");
    }
  };

  return {
    message,
    blogs,
    blog,
    likedBlogs,
    loading,
    error,
    comments,
    commentChild,
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
    getBlogLikes,
    setSubmitting,
    handleEditComment,
  };
};

export default useBlog;
