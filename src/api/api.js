import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

// let authApiCallCount = 0;

const authApi = (token = null) => {
  // authApiCallCount++; // Tăng biến đếm mỗi lần authApi được gọi
  // console.log(`authApi has been called ${authApiCallCount} times`);

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
  web: process.env.REACT_APP_Web_ENDPOINT,
  login: process.env.REACT_APP_LOGIN_ENDPOINT,
  refreshLogin: process.env.REACT_APP_refreshLogin_ENDPOINT,
  Verify: process.env.REACT_APP_Verify_ENDPOINT,
  currentUser: process.env.REACT_APP_currentUser_ENDPOINT,
  UserInfo: process.env.REACT_APP_UserInfo_ENDPOINT,
  UpdateProfile: process.env.REACT_APP_UpdateProfile_ENDPOINT,
  ChangePassword: process.env.REACT_APP_ChangePassword_ENDPOINT,
  currentUserBlog: process.env.REACT_APP_currentUserBlog_ENDPOINT,
  RegisterUser: process.env.REACT_APP_RegisterUser_ENDPOINT,
  createUser: process.env.REACT_APP_createUser_ENDPOINT,
  AdminUser: process.env.REACT_APP_AdminUser_ENDPOINT,
  UserApplyList: process.env.REACT_APP_UserApplyList_ENDPOINT,
  Blog: process.env.REACT_APP_Blog_ENDPOINT,
  BlogDetail: process.env.REACT_APP_BlogDetail_ENDPOINT,
  LikeBlog: process.env.REACT_APP_LikeBlog_ENDPOINT,
  CmtBlog: process.env.REACT_APP_CmtBlog_ENDPOINT,
  CmtBlogReply: process.env.REACT_APP_CmtBlog_Replies_ENDPOINT,
  DelCmt: process.env.REACT_APP_DelCmt_ENDPOINT,
  Recruitment: process.env.REACT_APP_Recruitment_ENDPOINT,
  Tag: process.env.REACT_APP_Tag_ENDPOINT,
  TagId: process.env.REACT_APP_TagId_ENDPOINT,
  RecruitmentDetail: process.env.REACT_APP_RecruitmentDetail_ENDPOINT,
  ApplyJob: process.env.REACT_APP_Apply_Job_ENDPOINT,
  EditApplyJob: process.env.REACT_APP_Edit_Apply_Job_ENDPOINT,
  Categories: process.env.REACT_APP_Categories_ENDPOINT,
  Category: process.env.REACT_APP_Category_ENDPOINT,
  CategoryProduct: process.env.REACT_APP_CategoryProduct_ENDPOINT,
  Banner: process.env.REACT_APP_BannerId_ENDPOINT,
  UserBanner: process.env.REACT_APP_UserBanner_ENDPOINT,
  AdminBanner: process.env.REACT_APP_AdminBanner_ENDPOINT,
  Products: process.env.REACT_APP_Products_ENDPOINT,
  ProductDetail: process.env.REACT_APP_Product_ENDPOINT,
  GroupList: process.env.REACT_APP_GroupList_ENDPOINT,
  GroupAllUser: process.env.REACT_APP_GroupAllUser_ENDPOINT,
  GroupUser: process.env.REACT_APP_GroupUser_ENDPOINT,
  AddUser: process.env.REACT_APP_AddUser_ENDPOINT,
  RemoveUser: process.env.REACT_APP_RemoveUser_ENDPOINT,
  StaticalUser: process.env.REACT_APP_StaticalUser_ENDPOINT,
  StaticalProductCategoryGeneral:
    process.env.REACT_APP_StaticalProductCategoryGeneral_ENDPOINT,
  StaticalBlogGeneral: process.env.REACT_APP_StaticalBlogGeneral_ENDPOINT,
  StaticalProductGeneral: process.env.REACT_APP_StaticalProductGeneral_ENDPOINT,
  StaticalProductCategorySpecific:
    process.env.REACT_APP_StaticalProductCategorySpecific_ENDPOINT,
  StaticalJobPostGeneral: process.env.REACT_APP_StaticalJobPostGeneral_ENDPOINT,
  StaticalJobApplicationGeneral:
    process.env.REACT_APP_StaticalJobApplicationGeneral_ENDPOINT,
  StaticalJobPostSpecific:
    process.env.REACT_APP_StaticalJobPostSpecific_ENDPOINT,
};

const authApiPrivate = authApi();
authApiPrivate.defaults.withCredentials = true;

export { authApi, endpoints, baseURL, authApiPrivate };
