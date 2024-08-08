import React, { useState, useEffect } from "react";
import { provinces } from "../../data/DataLocat";

const LocationSelector = ({
  onLocationChange,
  selectedProvince,
  selectedDistrict,
}) => {
  const [currentProvince, setCurrentProvince] = useState(
    selectedProvince || ""
  );
  const [currentDistrict, setCurrentDistrict] = useState(
    selectedDistrict || ""
  );
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    setCurrentProvince(selectedProvince || "");
    setCurrentDistrict(selectedDistrict || "");
  }, [selectedProvince, selectedDistrict]);

  useEffect(() => {
    const formattedLocation = `${currentProvince}, ${currentDistrict}`;
    onLocationChange(formattedLocation);
  }, [currentProvince, currentDistrict, onLocationChange]);

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setCurrentProvince(provinceName);
    const selectedProvinceData = provinces.find(
      (province) => province.name === provinceName
    );
    setDistricts(selectedProvinceData ? selectedProvinceData.districts : []);
    setCurrentDistrict(""); // Reset selected district
  };

  const handleDistrictChange = (e) => {
    setCurrentDistrict(e.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="province" className="block mb-1">
        Thành Phố/Tỉnh Thành:
      </label>
      <select
        id="province"
        value={currentProvince}
        onChange={handleProvinceChange}
        className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
        required
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((province) => (
          <option key={province.name} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>

      {districts.length > 0 && (
        <>
          <label htmlFor="district" className="block mb-1 mt-4">
            Quận/Huyện:
          </label>
          <select
            id="district"
            value={currentDistrict}
            onChange={handleDistrictChange}
            className="px-4 py-2 border rounded-lg w-full bg-gray-50 border-zinc-900"
            required
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default LocationSelector;
