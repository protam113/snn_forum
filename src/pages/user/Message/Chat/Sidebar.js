import { Link } from "react-router-dom";
import OtherUsers from "./Components/Otheruser";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      <div className="divider my-2"></div>
      <div className="flex items-center mb-2">
        <h3 className="text-md font-medium mr-2">Người Dùng Khác</h3>

        <Link
          to="/group_chat"
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Group Chat
        </Link>
      </div>

      <OtherUsers />
    </div>
  );
};

export default Sidebar;
