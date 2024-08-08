import React from "react";
// import { RiArrowRightDoubleFill } from "react-icons/ri";
// import { MdOutlineTopic } from "react-icons/md";
import { FaHome, FaQuestionCircle, FaUser, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../context/themeContext";

const Sidebar = () => {
  const { theme } = useTheme();

  // const teams = [
  //   {
  //     id: 1,
  //     image: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Team1",
  //     name: "Nhóm 1",
  //   },
  //   {
  //     id: 2,
  //     image: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Team2",
  //     name: "Nhóm 2",
  //   },
  //   {
  //     id: 3,
  //     image: "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Team3",
  //     name: "Nhóm 3",
  //   },
  // ];

  const linkClasses = `relative flex items-center justify-center w-[190px] h-[40px] rounded hover:bg-gray-400 ${
    theme === "dark"
      ? "bg-zinc-800 text-white hover:bg-zinc-700"
      : "bg-white text-black"
  }`;
  // const teamItemClasses = `flex items-center mb-4 hover:${
  //   theme === "dark" ? "bg-gray-600" : "bg-gray-700"
  // } transition-colors p-2 rounded-md`;

  return (
    <div>
      {/* Sidebar for desktop (lg) */}
      <div className="hidden lg:block lg:w-60 lg:bg-white-900 lg:text-black lg:p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="relative flex flex-col space-y-4">
          <Link to="/" className={linkClasses}>
            <FaHome
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Home</span>
          </Link>
          <Link to="/questions" className={linkClasses}>
            <FaQuestionCircle
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Questions</span>
          </Link>
          <Link to="/nguoi_dung" className={linkClasses}>
            <FaUser
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">User</span>
          </Link>
          <Link to="/company" className={linkClasses}>
            <FaBuilding
              className={`absolute left-2 text-lg ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span className="ml-8 text-14">Company</span>
          </Link>
        </div>
        <hr className="border-zinc-900 my-4" />
        {/* <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center space-x-2">
            <MdOutlineTopic className="h-6 w-6" />
            <span>Topic</span>
          </h2>
          {teams.map((team) => (
            <div key={team.id} className={teamItemClasses}>
              <img
                className="h-8 w-8 rounded-full object-cover flex-shrink-0 transition-transform transform hover:scale-110"
                src={team.image}
                alt="Team"
              />
              <span className="ml-3 text-sm font-medium">{team.name}</span>
              <button className="ml-auto text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
                <RiArrowRightDoubleFill className="h-5 w-5" />
              </button>
            </div>
          ))} 
        </div>*/}
      </div>

      {/* Sidebar for iPad (md)
      <div className="hidden md:block md:w-56 md:bg-zinc-900 md:text-white md:p-4 md:sticky md:top-0 md:h-screen md:overflow-y-auto lg:hidden">
        <div>{/* <UInfo /> </div>
        <hr className="border-zinc-900 my-4" />
        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center space-x-2">
            <RiTeamFill className="h-6 w-6" />
            <span>Các nhóm</span>
          </h2>
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex items-center mb-4 hover:bg-gray-700 transition-colors p-2 rounded-md"
            >
              <img
                className="h-8 w-8 rounded-full object-cover flex-shrink-0 transition-transform transform hover:scale-110"
                src={team.image}
                alt="Team"
              />
              <span className="ml-3 text-sm font-medium">{team.name}</span>
              <button className="ml-auto text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
                <RiArrowRightDoubleFill className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Sidebar for mobile (sm) */}
      {/* Not rendered, as it is hidden */}
    </div>
  );
};

export default Sidebar;
