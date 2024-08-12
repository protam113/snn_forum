import React from "react";
import Product from "./components/product";
import { Link } from "react-router-dom";
import Banner from "./components/banner";
import Category from "./components/category";
import NavProduct from "./components/navProduct";
import PopupCreate from "./components/PopupCreat";

const Product_feed = () => {
  return (
    <main className="flex-1">
      <Banner />
      <section className="py-12 md:py-16 lg:py-20">
        <NavProduct />
        <hr className="my-4 border-zinc-900" />

        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Thể loại</h2>
            <Link to="/all-products">
              <button className="text-sm font-medium text-blue-600 hover:underline">
                Xem tất cả
              </button>
            </Link>
          </div>
          <Category />
        </div>
        <hr className="my-4 border-zinc-900" />

        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Sản Phẩm</h2>
            <Link to="/san_pham/tat_ca_san_pham">
              <button className="text-sm font-medium text-blue-600 hover:underline">
                Xem tất cả
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>
      </section>
      <PopupCreate />
    </main>
  );
};

export default Product_feed;
