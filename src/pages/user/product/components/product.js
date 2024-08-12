import React from "react";
import Prd from "../../../../assets/img/product.jpg";
import { Link } from "react-router-dom";
const Product = () => {
  return (
    <Link
      className="bg-background rounded-lg shadow-lg overflow-hidden"
      to="/san_pham/chi_tiet_san_pham"
    >
      <img
        src={Prd}
        alt="Product 1"
        width={500}
        height={400}
        className="w-full h-64 object-cover"
        style={{ aspectRatio: "500/400", objectFit: "cover" }}
      />
      <div className="p-4">
        <h3 className="text-16 font-semibold">Classic Leather Backpack</h3>
        <p className="text-muted-foreground text-14">Durable and stylish</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-14 font-semibold">$79.99</span>
          <button className="bg-custom-red text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors text-14">
            Xem chi tiết
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
