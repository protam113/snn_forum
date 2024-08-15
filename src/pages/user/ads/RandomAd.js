import React, { useState, useEffect } from "react";

const ads = [
  {
    id: 1,
    title: "Product A",
    description: "Description for Product A",
    imageUrl: "https://via.placeholder.com/150",
    link: "/product-a",
  },
  {
    id: 2,
    title: "Product B",
    description: "Description for Product B",
    imageUrl: "https://via.placeholder.com/150",
    link: "/product-b",
  },
  {
    id: 3,
    title: "Product C",
    description: "Description for Product C",
    imageUrl: "https://via.placeholder.com/150",
    link: "/product-c",
  },
  // Add more products as needed
];

const RandomAd = () => {
  const [randomAd, setRandomAd] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ads.length);
    setRandomAd(ads[randomIndex]);
  }, []);

  if (!randomAd) return null;

  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white mb-6">
      <a href={randomAd.link} target="_blank" rel="noopener noreferrer">
        <img
          src={randomAd.imageUrl}
          alt={randomAd.title}
          className="w-full h-auto mb-4 rounded"
        />
        <h3 className="text-xl font-bold mb-2">{randomAd.title}</h3>
        <p className="text-gray-600">{randomAd.description}</p>
      </a>
    </div>
  );
};

export default RandomAd;
