import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import LocationSearch from "../../../../components/Location/LocationSearch";
import useDebounce from "../../../../hooks/useDebounce";
import { useTheme } from "../../../../context/themeContext";

const JobSearchForm = () => {
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const inputSearchDebounced = useDebounce(inputSearch, 300);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLocationChange = (newLocation) => {
    if (typeof newLocation === "string") {
      setLocation(newLocation);
    }
  };

  return (
    <div
      className={` rounded-lg shadow-md p-6 max-w-3xl mx-auto ${
        theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Tìm Cơ Hội Tiếp Theo Của Bạn</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label htmlFor="job-title" className="text-sm font-medium">
            Chức Danh Công Việc
          </label>
          <input
            id="job-title"
            type="text"
            placeholder="ví dụ: Kỹ Sư Phần Mềm"
            className={`border border-gray-300 rounded-md p-2 ${
              theme === "dark"
                ? "bg-zinc-900 text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="location" className="text-sm font-medium">
            Địa Điểm
          </label>
          <LocationSearch
            location={location}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="job-type" className="text-sm font-medium">
            Loại Công Việc
          </label>
          <div className="relative">
            <button
              type="button"
              className={`border border-gray-300 rounded-md p-2 w-full text-left ${
                theme === "dark"
                  ? "bg-zinc-900 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={toggleDropdown}
            >
              <span>Chọn loại công việc</span>
              <IoMdArrowDropdown className="absolute right-2 top-2" />
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute w-full mt-2 ${
                  theme === "dark"
                    ? "bg-zinc-900 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                } border rounded-md shadow-lg z-10`}
              >
                <div className="p-2">
                  <div className="flex items-center">
                    <input id="full-time" type="checkbox" className="mr-2" />
                    <label htmlFor="full-time">Toàn Thời Gian</label>
                  </div>
                  <div className="flex items-center">
                    <input id="part-time" type="checkbox" className="mr-2" />
                    <label htmlFor="part-time">Bán Thời Gian</label>
                  </div>
                  <div className="flex items-center">
                    <input id="contract" type="checkbox" className="mr-2" />
                    <label htmlFor="contract">Hợp Đồng</label>
                  </div>
                  <div className="flex items-center">
                    <input id="internship" type="checkbox" className="mr-2" />
                    <label htmlFor="internship">Thực Tập</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className={`bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 ${
            theme === "dark"
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Tìm Việc Làm
        </button>
      </div>
    </div>
  );
};

export default JobSearchForm;
