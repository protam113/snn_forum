import React from "react";
import { provinces as allProvinces } from "../../data/DataLocat";
import { useTheme } from "../../context/themeContext";

const LocationSearch = ({ location, onLocationChange }) => {
  const { theme } = useTheme(); // Get theme from context
  const [selectedProvince, setSelectedProvince] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict(""); // Reset district when province changes
    if (onLocationChange && typeof onLocationChange === "function") {
      onLocationChange(`${province}`); // Set province and reset district
    }
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    if (onLocationChange && typeof onLocationChange === "function") {
      onLocationChange(`${selectedProvince}, ${district}`);
    }
  };

  // Find districts for the selected province
  const provinceData = allProvinces.find((p) => p.name === selectedProvince);
  const districts = provinceData ? provinceData.districts : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="province" className="text-sm font-medium mb-1 block">
          Tỉnh/Thành Phố
        </label>
        <select
          id="province"
          name="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className={`border p-3 rounded-lg w-full ${
            theme === "dark"
              ? "bg-zinc-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          } focus:ring-2 focus:ring-blue-500`}
        >
          <option value="" disabled>
            Chọn tỉnh/thành phố
          </option>
          {allProvinces.map((province) => (
            <option key={province.name} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="district" className="text-sm font-medium mb-1 block">
          Quận/Huyện
        </label>
        <select
          id="district"
          name="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className={`border p-3 rounded-lg w-full ${
            theme === "dark"
              ? "bg-zinc-800 text-white border-zinc-600"
              : "bg-white text-black border-zinc-300"
          } focus:ring-2 focus:ring-blue-500`}
          disabled={!selectedProvince} // Disable district selection if no province is selected
        >
          <option value="" disabled>
            Chọn quận/huyện
          </option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSearch;
