// src/components/Product.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";
import "@testing-library/jest-dom/extend-expect";
import useProduct from "../hooks/useProduct";

// Mock hook useProduct
jest.mock("../../../../hooks/useProduct");

describe("Product component", () => {
  test("displays loading indicator when loading", () => {
    // Giả lập trạng thái loading
    useProduct.mockReturnValue({ products: [], loading: true, error: null });

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    // Kiểm tra xem loading indicator được hiển thị
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays error message when error occurs", () => {
    // Giả lập trạng thái lỗi
    useProduct.mockReturnValue({
      products: [],
      loading: false,
      error: "Error fetching products",
    });

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    // Kiểm tra xem thông báo lỗi được hiển thị
    expect(screen.getByText(/error fetching products/i)).toBeInTheDocument();
  });

  test("renders products correctly with real data", () => {
    // Giả lập dữ liệu từ useProduct
    const { products, loading, error } = useProduct.mockReturnValue({
      products: [
        {
          id: 1,
          file: "image1.jpg",
          title: "Product 1",
          price: 100000,
          user: { username: "user1" },
        },
        {
          id: 2,
          file: "image2.jpg",
          title: "Product 2",
          price: 200000,
          user: { username: "user2" },
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    // Kiểm tra xem các sản phẩm được hiển thị đúng cách
    products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(
        screen.getByText(
          `${new Intl.NumberFormat("vi-VN").format(product.price)} đ`
        )
      ).toBeInTheDocument();
    });
  });
});
