import UserChart from "./components/chart/userChart";
import { useTheme } from "../../../context/themeContext";
import { Link } from "react-router-dom";
import CategoryChart from "./components/chart/categoryChart";
import BannerChart from "./components/chart/bannerChart";

const AdHome = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex flex-col ${
        theme === "dark" ? " bg-gray-900 text-white" : " bg-gray-100 text-black"
      }`}
    >
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="shadow-md rounded-lg p-4 bg-white">
              <Link to="/admin/the_loai">
                <CategoryChart />
              </Link>
            </div>

            <div className="shadow-md rounded-lg p-4 bg-white">
              <Link to="/admin/banners">
                <BannerChart />
              </Link>
            </div>
          </div>
        </main>
      </div>
      <div className="shadow-md rounded-lg p-4 bg-white">
        <div className="font-semibold text-lg mb-2">User Management</div>
        <Link to="/admin/quan_ly_nguoi_dung">
          <UserChart />
        </Link>
      </div>
    </div>
  );
};

export default AdHome;
