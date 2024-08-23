import UserChart from "./components/chart/userChart";
import LineChart from "./components/chart/lineChart";
import MixChart from "./components/chart/MixedChart";
import { useTheme } from "../../../context/themeContext";
import { Link } from "react-router-dom";
import CategoryChart from "./components/chart/categoryChart";
import BannerChart from "./components/chart/bannerChart";

const AdHome = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex ${
        theme === "dark" ? " text-white" : " text-black"
      }`}
    >
      <main className="p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/admin/the_loai" className=" shadow-md rounded-lg p-4">
            <CategoryChart />
          </Link>
          <div className=" shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Group Admin</div>
            <Link to="/admin/quan_ly_nguoi_dung">
              <UserChart />
            </Link>
          </div>
          <div className=" shadow-md rounded-lg p-4">
            <Link to="/admin/banners" className=" shadow-md rounded-lg p-4">
              <BannerChart />
            </Link>
          </div>
        </div>

        {/* Container for charts */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Thống Kê</div>
            <div className="text-sm text-gray-600">
              Thống kê các số lượng người dùng, danh mục(categories) và banner.
            </div>
            <LineChart />
          </div>
          <div className="shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Thống Kê</div>
            <div className="text-sm text-gray-600">
              Thống kê các số lượng bài viết, sản phẩm và tin tuyển dụng.
            </div>
            <MixChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdHome;
