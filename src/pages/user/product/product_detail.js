import React from "react";

const ProductDetail = () => {
  const product = {
    id: 1,
    name: "Vintage Leather Briefcase",
    description:
      "A timeless and durable leather briefcase, perfect for the modern professional.",
    image: "/placeholder.svg",
    price: 299.99,
    condition: "Excellent",
    status: "In Stock",
    location: "New York, NY",
    seller: {
      name: "John Doe",
      phone: "555-1234",
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <h2 className="text-2xl font-bold">${product.price.toFixed(2)}</h2>
        </div>
      </div>
      <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Product Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Condition</p>
              <p className="font-medium">{product.condition}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium">{product.status}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{product.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Quantity</p>
              <select
                defaultValue="1"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Seller Information</h2>
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground">Seller Name</p>
              <p className="font-medium">{product.seller.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{product.seller.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 md:mt-16 flex justify-end">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
