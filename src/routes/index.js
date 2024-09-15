// layout
import AdHome from "../components/layouts/AdminLayout/AdHome";
import { DefaultLayout, AdminLayout } from "../components/layouts/index";
import AdminWeb from "../pages/admin/admin/adminWeb";
import AddUser from "../pages/admin/adUser/addUser";
import AdUser from "../pages/admin/adUser/adUser";
import Banner from "../pages/admin/banner/banner";
import CreateBanner from "../pages/admin/banner/createBanner";
import AdCategory from "../pages/admin/category/Category";
import CreateCategory from "../pages/admin/category/createCategory";
import EdtCategory from "../pages/admin/category/edtCategory";
import StaticalJobPostGeneral from "../pages/admin/statisticalMail.js/StaticalJobPostGeneral";
import StaticalJobPostSpecific from "../pages/admin/statisticalMail.js/StaticalJobPostSpecific";
import StaticalProductCategory from "../pages/admin/statisticalMail.js/StaticalProductCategoryGeneral";
import StaticalProduct from "../pages/admin/statisticalMail.js/StaticalProductGeneral";
import StatisticalJobApplicationGeneral from "../pages/admin/statisticalMail.js/StatisticalJobApplicationGeneral";
import StatisticalPage from "../pages/admin/statisticalMail.js/statisticalPage";
import StatisticalBlogs from "../pages/admin/statisticalMail.js/StatisticsBlog";
import ManageTag from "../pages/admin/tag/ManageTag";
import ResetPassword from "../pages/auth/authResetPass";
import ConfirmPage from "../pages/auth/confirmPage";
import Login from "../pages/auth/login";
import NotiPage from "../pages/auth/notiPage";
import Register from "../pages/auth/register";
import RejectPage from "../pages/auth/rejectpage";
import Blog_detail from "../pages/user/blog/blog_detail";
import Create from "../pages/user/blog/create/create";
import EdtBlog from "../pages/user/blog/edtBlog";
import ContributeIdeas from "../pages/user/contributeIdeas";
import Product_Detail from "../pages/user/demo/ProductDetail";
import ProductList from "../pages/user/demo/ProductList";

import Home from "../pages/user/home";
import AllProduct from "../pages/user/product/allProduct";
import CategoryProduct from "../pages/user/product/components/CategoryProduct";
import CreateProduct from "../pages/user/product/CreateProduct";
import EdtProduct from "../pages/user/product/edtProduct";
import ProductDetail from "../pages/user/product/product_detail";
import Product from "../pages/user/product/product_feed";
import EditProfile from "../pages/user/profile/edtProfile";
import ProfileMain from "../pages/user/ProfileMain";
import ApplicationsList from "../pages/user/recruitment/applicationsList";
import ApplyRecruitment from "../pages/user/recruitment/applyRecruitment";
import CreateRecruitment from "../pages/user/recruitment/createRecruitment";
import EdtRecruitment from "../pages/user/recruitment/edtRecruitment";
import Manage from "../pages/user/recruitment/manage/manage";
import WorkManage from "../pages/user/recruitment/manage/workManage";
import Recruitment from "../pages/user/recruitment/recruitment";
import RecruitmentDetail from "../pages/user/recruitment/recruitmentDetail";
import setting from "../pages/user/setting/setting";
import User from "../pages/user/Suser/user";

const publicRoutes = [
  // auth
  { path: "/login", component: Login, layout: DefaultLayout },
  { path: "/password/reset/", component: ResetPassword, layout: DefaultLayout },
  { path: "/register", component: Register, layout: DefaultLayout },
  {
    path: "/xac_thuc_thanh_cong",
    component: ConfirmPage,
    layout: DefaultLayout,
  },
  {
    path: "/xac_thuc_khong_thanh_cong",
    component: RejectPage,
    layout: DefaultLayout,
  },
  {
    path: "/xac_thuc",
    component: NotiPage,
    layout: DefaultLayout,
  },

  { path: "/demo/", component: ProductList, layout: DefaultLayout },
  { path: "/demo/:id", component: Product_Detail, layout: DefaultLayout },

  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/create_blog", component: Create, layout: DefaultLayout },
  {
    path: "/blog/:id",
    component: Blog_detail,
    layout: DefaultLayout,
  },
  { path: "/blog/edit/:blogId", component: EdtBlog, layout: DefaultLayout },
  { path: "/profile/:id", component: ProfileMain, layout: DefaultLayout },
  {
    path: "/profile/:username/edit",
    component: EditProfile,
    layout: DefaultLayout,
  },

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
    path: "/san_pham/:id/chinh_sua_san_pham",
    component: EdtProduct,
    layout: DefaultLayout,
  },
  {
    path: "/san_pham/tat_ca_san_pham",
    component: AllProduct,
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
    path: "/admin/thong_tin_web",
    component: AdminWeb,
    layout: AdminLayout,
  },
  {
    path: "/admin/thong_ke/blog",
    component: StatisticalBlogs,
    layout: AdminLayout,
  },
  {
    path: "/admin/thong_ke/san_pham",
    component: StaticalProduct,
    layout: AdminLayout,
  },
  {
    path: "/admin/thong_ke/the_loai",
    component: StaticalProductCategory,
    layout: AdminLayout,
  },
  {
    path: "/admin/thong_ke/don_ung_tuyen",
    component: StatisticalJobApplicationGeneral,
    layout: AdminLayout,
  },
  {
    path: "/admin/thong_ke/ung_tuyen",
    component: StaticalJobPostGeneral,
    layout: AdminLayout,
  },

  {
    path: "/admin/thong_ke/tuyen_dung",
    component: StaticalJobPostSpecific,
    layout: AdminLayout,
  },

  {
    path: "/admin/tag",
    component: ManageTag,
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
    path: "/admin/quan_ly_nguoi_dung/them_nguoi_dung",
    component: AddUser,
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
