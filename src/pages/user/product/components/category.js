import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useCategoryList } from "../../../../hooks/Product/useCategories";

const slidesToShow = 4;

const createSlides = (categories, slidesToShow) => {
  const slides = [];
  if (categories) {
    for (let i = 0; i < categories.length; i += slidesToShow) {
      slides.push(categories.slice(i, i + slidesToShow));
    }
  }
  return slides;
};

const Category = () => {
  const { data: categories, isLoading, error } = useCategoryList();
  const slides = createSlides(categories, slidesToShow);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load categories</p>
    );
  }

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
          {slides.length > 0 ? (
            slides.map((slide, index) => (
              <div key={index} className="flex space-x-4 overflow-x-auto">
                {slide.map((category) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-full sm:w-1/4 lg:w-1/5 p-2"
                    style={{ flexBasis: `calc(100% / ${slidesToShow})` }}
                  >
                    <Link
                      to={`/san_pham/${category.id}/san_pham_theo_the_loai`}
                      className="block bg-white rounded-lg shadow-md overflow-hidden h-full"
                    >
                      <div className="p-4 text-center">
                        <h3
                          className="text-14 md:text-16 lg:text-18 text-black font-semibold"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Categories Found</p>
          )}
        </Slide>
      </div>
    </div>
  );
};

export default Category;
