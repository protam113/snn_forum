// layout
import { DefaultLayout, AdminLayout } from "../components/layouts/index";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Blog_detail from "../pages/user/blog/blog_detail";
import Create from "../pages/user/blog/create/create";
import EdtBlog from "../pages/user/blog/edtBlog";
// import AdHome from "../pages/admin/AdHome";
// import Error_404 from "../pages/error/404";
// import Error_500 from "../pages/error/500";
// import Example from "../pages/error/load";

import Home from "../pages/user/home";
import Profile from "../pages/user/profile";
import EditProfile from "../pages/user/profile/edtProfile";
import ProfileIf from "../pages/user/profile/Personal/ProfileIf";
import Recruitment from "../pages/user/recruitment/recruitment";
// import Mess from "../pages/user/message/mess";
// import MessDetail from "../pages/user/message/messDetail";
// import Code from "../pages/user/post/CodePost/Code";
// import EditPost from "../pages/user/post/editPost";
// import PostDetail from "../pages/user/post/postDetail";
// import EditProfile from "../pages/user/profile/editProfile";
// import Profile from "../pages/user/profile/profile";
// import Search from "../pages/user/search/search";
// import Setting from "../pages/user/setting/setting";

const publicRoutes = [
  // auth
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
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

  //   { path: "/search", component: Search, layout: DefaultLayout },

  { path: "/tuyen_dung", component: Recruitment, layout: DefaultLayout },
  //   { path: "/post/:id", component: PostDetail, layout: DefaultLayout },
  //   { path: "/post/edit/:id/", component: EditPost, layout: DefaultLayout },

  //   { path: "/setting", component: Setting, layout: DefaultLayout },

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
