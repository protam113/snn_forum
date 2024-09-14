import { useTheme } from "../../context/themeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id="theme-toggle"
            className="sr-only peer"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <div className="w-12 h-6 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 relative transition-colors duration-300">
            <div
              className={`absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                theme === "dark" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
