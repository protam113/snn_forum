import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Import the default styles

// Example category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://via.placeholder.com/400x300?text=Electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://via.placeholder.com/400x300?text=Fashion",
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "https://via.placeholder.com/400x300?text=Home+%26+Garden",
  },
  {
    id: 4,
    name: "Sports",
    image: "https://via.placeholder.com/400x300?text=Sports",
  },
  {
    id: 5,
    name: "Toys",
    image: "https://via.placeholder.com/400x300?text=Toys",
  },
  {
    id: 6,
    name: "Automotive",
    image: "https://via.placeholder.com/400x300?text=Automotive",
  },
  {
    id: 7,
    name: "Books",
    image: "https://via.placeholder.com/400x300?text=Books",
  },
  {
    id: 8,
    name: "Health",
    image: "https://via.placeholder.com/400x300?text=Health",
  },
  // Add more categories as needed
];

const slidesToShow = 4; // Number of items to show per slide

// Create slides based on categories
const createSlides = (categories, slidesToShow) => {
  const slides = [];
  for (let i = 0; i < categories.length; i += slidesToShow) {
    slides.push(categories.slice(i, i + slidesToShow));
  }
  return slides;
};

const Category = () => {
  const slides = createSlides(categories, slidesToShow);

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <Slide
          duration={5000}
          transitionDuration={500}
          infinite={true}
          indicators={true}
          arrows={true}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex space-x-4">
              {slide.map((category) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-14 md:text-16 lg:text-18 font-semibold">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default Category;
