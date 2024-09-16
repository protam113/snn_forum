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

  // Find the districts for the current province
  const getDistricts = (provinceName) => {
    const provinceData = provinces.find((p) => p.name === provinceName);
    return provinceData ? provinceData.districts : [];
  };

  useEffect(() => {
    setCurrentProvince(selectedProvince || "");
  }, [selectedProvince]);

  useEffect(() => {
    setCurrentDistrict(selectedDistrict || "");
  }, [selectedDistrict]);

  useEffect(() => {
    // Reset the district when province changes
    setCurrentDistrict("");
    onLocationChange(`${currentProvince}, `); // Update parent component when province changes
  }, [currentProvince]);

  const handleProvinceChange = (e) => {
    const newProvince = e.target.value;
    setCurrentProvince(newProvince);
    onLocationChange(`${newProvince}, ${currentDistrict}`);
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setCurrentDistrict(newDistrict);
    onLocationChange(`${currentProvince}, ${newDistrict}`);
  };

  const districts = getDistricts(currentProvince);

  return (
    <div>
      <select value={currentProvince} onChange={handleProvinceChange}>
        <option value="">Tỉnh/Thành Phố</option>
        {provinces.map((province) => (
          <option key={province.name} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>

      <select
        value={currentDistrict}
        onChange={handleDistrictChange}
        disabled={!currentProvince}
      >
        <option value=""> Quận/Huyện</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
