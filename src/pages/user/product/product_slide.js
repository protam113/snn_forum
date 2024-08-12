import React from "react";
import ProductSidebar from "./components/productSidebar";
import Product from "./components/product";
import NavProduct from "./components/navProduct";
import PopupCreate from "./components/PopupCreat";

const Product_slide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <NavProduct />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 p-4 bg-gray-100">
          <ProductSidebar />
        </div>

        {/* Product Section */}
        <section className="w-full md:w-4/5 px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </section>
      </div>
      <PopupCreate />
    </div>
  );
};

export default Product_slide;
