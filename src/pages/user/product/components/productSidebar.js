import React, { useState } from "react";

// Example data
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home & Garden" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Toys" },
  { id: 6, name: "Automotive" },
  { id: 7, name: "Books" },
  { id: 8, name: "Health" },
];

const locations = ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hue", "Nha Trang"];

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [condition, setCondition] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange([min, max]);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-16 font-semibold mb-2">Categories</h3>
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-14 sm:w-auto text-left p-4 border rounded-md ${
                selectedCategory?.id === category.id
                  ? "bg-blue-500 text-white border-blue-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-16 font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="500000000"
          step="1000000"
          value={`${priceRange[0]}-${priceRange[1]}`}
          onChange={handlePriceChange}
          className="w-full text-14"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>0 VND</span>
          <span>500,000,000 VND</span>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="text-14 font-semibold mb-2">Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location} className="text-14">
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="text-16 font-semibold mb-2">Condition</h3>
        <div className="flex flex-col">
          <label className="flex items-center mb-2 text-14">
            <input
              type="radio"
              name="condition"
              value="new"
              checked={condition === "new"}
              onChange={handleConditionChange}
              className="mr-2"
            />
            New
          </label>
          <label className="flex items-center text-14">
            <input
              type="radio"
              name="condition"
              value="used"
              checked={condition === "used"}
              onChange={handleConditionChange}
              className="mr-2"
            />
            Used
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
