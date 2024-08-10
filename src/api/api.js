// api/api.js
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

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
  login: process.env.REACT_APP_LOGIN_ENDPOINT,
  refreshLogin: process.env.REACT_APP_refreshLogin_ENDPOINT,
  currentUser: process.env.REACT_APP_currentUser_ENDPOINT,
  UserInfo: process.env.REACT_APP_UserInfo_ENDPOINT,
  UpdateProfile: process.env.REACT_APP_UpdateProfile_ENDPOINT,
  currentUserBlog: process.env.REACT_APP_currentUserBlog_ENDPOINT,
  // currentUserFollower: "/user/followers/",
  // currentUserFollowing: "/user/following/",
  createUser: process.env.REACT_APP_createUser_ENDPOINT,
  Blog: process.env.REACT_APP_Blog_ENDPOINT,
  EdtBlog: process.env.REACT_APP_EdtBlog_ENDPOINT,
  BlogDetail: process.env.REACT_APP_BlogDetail_ENDPOINT,
  LikeBlog: process.env.REACT_APP_LikeBlog_ENDPOINT,
  CmtBlog: process.env.REACT_APP_CmtBlog_ENDPOINT,
  DelCmt: process.env.REACT_APP_DelCmt_ENDPOINT,

  Recruitment: process.env.REACT_APP_Recruitment_ENDPOINT,
  // currentCompany: "/company/:id/",
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
