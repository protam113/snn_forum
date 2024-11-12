import React from "react";
import { useUserCategoryList } from "../../../../hooks/Product/useUserCategory";
import { Checkbox, Row, Col, Spin, Alert } from "antd";

const CategoryList = ({ selectedCategories = [], onCategoryChange }) => {
  const { data: categories = {}, isLoading, isError } = useUserCategoryList();

  // Đảm bảo selectedCategories là một mảng
  const selectedCategoriesArray = Array.isArray(selectedCategories)
    ? selectedCategories
    : [];

  const handleCheckboxChange = (id) => {
    const newSelectedCategories = selectedCategoriesArray.includes(id)
      ? selectedCategoriesArray.filter((categoryId) => categoryId !== id)
      : [...selectedCategoriesArray, id];

    onCategoryChange(newSelectedCategories);
  };

  if (isLoading) return <Spin tip="Loading categories..." />;
  if (isError) return <Alert message="Error loading categories" type="error" />;

  return (
    <Row gutter={[16, 16]}>
      {categories?.map((category) => (
        <Col span={12} key={category.id}>
          <Checkbox
            checked={selectedCategoriesArray.includes(category.id)}
            onChange={() => handleCheckboxChange(category.id)}
          >
            {category.name}
          </Checkbox>
        </Col>
      ))}
    </Row>
  );
};

export default CategoryList;
