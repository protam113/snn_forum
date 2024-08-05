// api/api.js
import axios from "axios";

const baseURL = "https://protam113.pythonanywhere.com/";

const authApi = (token = null) => {
  const config = {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  return axios.create(config);
};

// Các endpoint API
const endpoints = {
  login: "/o/token/",
  refreshLogin: "/o/token/refresh/",
  currentUser: "/user/details/",
  UserInfo: "/user/:id/",
  UpdateProfile: "/user/update-profile/",
  currentUserBlog: "/user/:id/blog/",
  // currentUserFollower: "/user/followers/",
  // currentUserFollowing: "/user/following/",
  createUser: "/user/",
  Blog: "/blog/",
  EdtBlog: "/blog/:id/",
  BlogDetail: "/blog/:id/",
  LikeBlog: "/blog/:id/like/",
  CmtBlog: "/blog/:id/comment/",
  DelCmt: "/comment/:id/",

  Company: "/company/",
  currentCompany: "/company/:id/",
};

const refreshToken = async (refreshToken) => {
  try {
    const api = authApi();
    const response = await api.post(endpoints.refreshLogin, { refreshToken });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const authApiPrivate = authApi();
authApiPrivate.defaults.withCredentials = true;

export { authApi, refreshToken, endpoints, baseURL, authApiPrivate };
