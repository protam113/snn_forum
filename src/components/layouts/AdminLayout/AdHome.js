import UserChart from "./components/chart/userChart";
import { useTheme } from "../../../context/themeContext";
import { Link } from "react-router-dom";
import { RevealBento } from "./components/RevealBento";

const AdHome = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex flex-col ${
        theme === "dark" ? "  text-white" : "  text-black"
      }`}
    >
      <header className="bg-custom-red text-white p-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>
      <div>
        <RevealBento />
      </div>
      <div className="bg-custom-red text-white p-2">
        <h1 className="text-2xl font-semibold">Thống kê người dùng</h1>
      </div>
      <div className="shadow-md rounded-lg p-4 bg-white">
        <Link to="/admin/quan_ly_nguoi_dung">
          <UserChart />
        </Link>
      </div>
    </div>
  );
};

export default AdHome;
