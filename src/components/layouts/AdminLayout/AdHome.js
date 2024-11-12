import { useTheme } from "../../../context/themeContext";
import { RevealBento } from "./components/RevealBento";

const AdHome = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`relative min-h-screen flex flex-col ${
        theme === "dark" ? "  text-white" : "  text-black"
      }`}
    >
      <div>
        <RevealBento />
      </div>
      <div className="bg-main-blue2 text-white p-2">
        <h1 className="text-2xl font-semibold">Thống kê người dùng</h1>
      </div>
    </div>
  );
};

export default AdHome;
