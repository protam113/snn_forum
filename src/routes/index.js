// layout
import { DefaultLayout, AdminLayout } from "../components/layouts/index";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Blog_detail from "../pages/user/blog/blog_detail";
import Create from "../pages/user/blog/create/create";
import EdtBlog from "../pages/user/blog/edtBlog";
import Company from "../pages/user/company/company";
import RegisterCo from "../pages/user/company/RegisterCo";
// import AdHome from "../pages/admin/AdHome";
// import Error_404 from "../pages/error/404";
// import Error_500 from "../pages/error/500";
// import Example from "../pages/error/load";

import Home from "../pages/user/home";
import Profile from "../pages/user/profile";
import EditProfile from "../pages/user/profile/edtProfile";
import ProfileIf from "../pages/user/profile/Personal/ProfileIf";
import Manage from "../pages/user/recruitment/manage/manage";
import WorkManage from "../pages/user/recruitment/manage/workManage";
import Recruitment from "../pages/user/recruitment/recruitment";
import RecruitmentMain from "../pages/user/recruitment/recruitmentMain";
import Search from "../pages/user/search";
import setting from "../pages/user/setting/setting";
import User from "../pages/user/Suser/user";

const publicRoutes = [
  // auth
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
  { path: "/register_company", component: RegisterCo, layout: DefaultLayout },
  // pages
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/create_blog", component: Create, layout: DefaultLayout },
  {
    path: "/blog/:id",
    component: Blog_detail,
    layout: DefaultLayout,
  },
  { path: "/blog/edit/:blogId", component: EdtBlog, layout: DefaultLayout },
  { path: "/profile/:username", component: Profile, layout: DefaultLayout },
  {
    path: "/profile_user/:id",
    component: ProfileIf,
    layout: DefaultLayout,
  },
  {
    path: "/profile/:username/edit",
    component: EditProfile,
    layout: DefaultLayout,
  },

  { path: "/search", component: Search, layout: DefaultLayout },

  // { path: "/tuyen_dung", component: RecruitmentMain, layout: DefaultLayout },
  { path: "/tuyen_dung", component: Recruitment, layout: DefaultLayout },

  { path: "/manage", component: Manage, layout: DefaultLayout },
  { path: "/work_manage", component: WorkManage, layout: DefaultLayout },

  //   { path: "/post/edit/:id/", component: EditPost, layout: DefaultLayout },

  { path: "/company", component: Company, layout: DefaultLayout },
  { path: "/nguoi_dung", component: User, layout: DefaultLayout },

  { path: "/setting", component: setting, layout: DefaultLayout },

  //   { path: "/load", component: Example, layout: DefaultLayout },
  //   { path: "/code", component: Code, layout: DefaultLayout },

  //   // Error
  //   { path: "/404_error", component: Error_404, layout: DefaultLayout },
  //   { path: "/500_error", component: Error_500, layout: DefaultLayout },

  //   // admin
];

const privateRoutes = [
  // { path: "/ad", component: AdHome, layout: AdminLayout }
];

export { publicRoutes, privateRoutes };
