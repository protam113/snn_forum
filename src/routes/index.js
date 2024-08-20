// layout
import AdHome from "../components/layouts/AdminLayout/AdHome";
import { DefaultLayout, AdminLayout } from "../components/layouts/index";
import AdUser from "../pages/admin/adUser/adUser";
import Banner from "../pages/admin/banner/banner";
import CreateBanner from "../pages/admin/banner/createBanner";
import AdCategory from "../pages/admin/category/Category";
import CreateCategory from "../pages/admin/category/createCategory";
import EdtCategory from "../pages/admin/category/edtCategory";
import ResetPassword from "../pages/auth/authResetPass";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Blog_detail from "../pages/user/blog/blog_detail";
import Create from "../pages/user/blog/create/create";
import EdtBlog from "../pages/user/blog/edtBlog";
import ContributeIdeas from "../pages/user/contributeIdeas";
// import AdHome from "../pages/admin/AdHome";
// import Error_404 from "../pages/error/404";
// import Error_500 from "../pages/error/500";
// import Example from "../pages/error/load";

import Home from "../pages/user/home";
import CategoryProduct from "../pages/user/product/components/CategoryProduct";
import CreateProduct from "../pages/user/product/CreateProduct";
import ProductDetail from "../pages/user/product/product_detail";
import Product from "../pages/user/product/product_feed";
import Profile from "../pages/user/profile";
import EditProfile from "../pages/user/profile/edtProfile";
import ProfileIf from "../pages/user/profile/Personal/ProfileIf";
import ApplicationsList from "../pages/user/recruitment/applicationsList";
import ApplyRecruitment from "../pages/user/recruitment/applyRecruitment";
import CreateRecruitment from "../pages/user/recruitment/createRecruitment";
import EdtRecruitment from "../pages/user/recruitment/edtRecruitment";
import Manage from "../pages/user/recruitment/manage/manage";
import WorkManage from "../pages/user/recruitment/manage/workManage";
import Recruitment from "../pages/user/recruitment/recruitment";
import RecruitmentDetail from "../pages/user/recruitment/recruitmentDetail";
// import RecruitmentMain from "../pages/user/recruitment/recruitmentMain";
import Search from "../pages/user/search";
import setting from "../pages/user/setting/setting";
import User from "../pages/user/Suser/user";

const publicRoutes = [
  // auth
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/password/reset/", component: ResetPassword, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },

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

  { path: "/tuyen_dung", component: Recruitment, layout: DefaultLayout },
  {
    path: "/tuyen_dung/tao_tin_tuyen_dung",
    component: CreateRecruitment,
    layout: DefaultLayout,
  },

  {
    path: "/tuyen_dung/:id",
    component: RecruitmentDetail,
    layout: DefaultLayout,
  },
  {
    path: "/tuyen_dung/chinh_sua/:id",
    component: EdtRecruitment,
    layout: DefaultLayout,
  },

  {
    path: "/tuyen_dung/:id/ung_tuyen",
    component: ApplyRecruitment,
    layout: DefaultLayout,
  },
  {
    path: "/tuyen_dung/:id/danh_sach_ung_tuyen",
    component: ApplicationsList,
    layout: DefaultLayout,
  },

  { path: "/manage", component: Manage, layout: DefaultLayout },
  { path: "/work_manage", component: WorkManage, layout: DefaultLayout },

  { path: "/san_pham", component: Product, layout: DefaultLayout },
  {
    path: "/san_pham/:id/san_pham_theo_the_loai",
    component: CategoryProduct,
    layout: DefaultLayout,
  },

  {
    path: "/san_pham/chi_tiet_san_pham/:id",
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: "/create_product", component: CreateProduct, layout: DefaultLayout },

  { path: "/nguoi_dung", component: User, layout: DefaultLayout },

  { path: "/setting", component: setting, layout: DefaultLayout },
  { path: "/support", component: ContributeIdeas, layout: DefaultLayout },
];

const privateRoutes = [
  {
    path: "/admin",
    component: AdHome,
    layout: AdminLayout,
  },
  {
    path: "/admin/the_loai",
    component: AdCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/the_loai/tao_the_loai",
    component: CreateCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/the_loai/sua_the_loai/:id",
    component: EdtCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/quan_ly_nguoi_dung",
    component: AdUser,
    layout: AdminLayout,
  },
  {
    path: "/admin/banners",
    component: Banner,
    layout: AdminLayout,
  },
  {
    path: "/admin/banners/tao_banner",
    component: CreateBanner,
    layout: AdminLayout,
  },
];

export { publicRoutes, privateRoutes };
