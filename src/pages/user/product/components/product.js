import React from "react";
import { Link } from "react-router-dom";
import useProduct from "../../../../hooks/useProduct";

const Product = () => {
  const { products, loading, error } = useProduct();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {products.map((product) => (
        <Link
          key={product.id}
          className="bg-background rounded-lg shadow-lg overflow-hidden flex flex-col"
          to={`/san_pham/chi_tiet_san_pham/${product.id}`}
        >
          <div className="relative h-64">
            <img
              src={product.file}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-16 font-semibold truncate">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-14">
                By {product.user.username}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-14 font-semibold">${product.price}</span>
              <button className="bg-custom-red text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors text-14">
                Xem chi tiết
              </button>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Product;
