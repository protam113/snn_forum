// components/ProductSidebar.js
import React, { useState } from "react";
import { useUserCategoryList } from "../../../../hooks/Product/useUserCategory";

const ProductSidebar = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceOrder, setPriceOrder] = useState("asc");
  const { data: categories = [] } = useUserCategoryList();

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevSelectedCategories) =>
      checked
        ? [...prevSelectedCategories, value]
        : prevSelectedCategories.filter((category) => category !== value)
    );
  };

  const handleFilterClick = () => {
    if (onFilterChange) {
      onFilterChange(selectedCategories, priceOrder);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-16 font-semibold mb-2">Thể Loại (Category)</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center text-14">
              <input
                type="checkbox"
                value={category.id}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      {/* <div>
        <label>
          Sắp xếp theo giá:
          <select
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
            onBlur={handleFilterClick}
          >
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
          </select>
        </label>
      </div> */}

      {/* Filter Button */}
      <button
        onClick={handleFilterClick}
        className="bg-main-blue2 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition-colors"
      >
        Lọc
      </button>
    </div>
  );
};

export default ProductSidebar;
