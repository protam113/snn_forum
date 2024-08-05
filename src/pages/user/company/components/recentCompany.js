import React from "react";
import { Link } from "react-router-dom";

const companies = [
  { name: "Công ty A", image: "link-to-image-a.jpg" },
  { name: "Công ty B", image: "link-to-image-b.jpg" },
  { name: "Công ty C", image: "link-to-image-c.jpg" },
  { name: "Công ty D", image: "link-to-image-d.jpg" },
  { name: "Công ty E", image: "link-to-image-e.jpg" },
  { name: "Công ty F", image: "link-to-image-f.jpg" },
];

const RecentCompany = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <Link
            key={index}
            className="border border-gray-200 hover:border-gray-400 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={company.image}
              alt={company.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-16 font-semibold">{company.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentCompany;
