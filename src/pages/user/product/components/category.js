import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Loading from "../../../error/load";
import { useUserCategoryList } from "../../../../hooks/Product/useUserCategory";

const slidesToShow = 6; // 6 items to show

// Create slides based on categories
const createSlides = (categories = [], slidesToShow) => {
  const slides = [];
  for (let i = 0; i < categories.length; i += slidesToShow) {
    slides.push(categories.slice(i, i + slidesToShow));
  }
  return slides;
};

const Category = () => {
  const { data: categories, isLoading, isError } = useUserCategoryList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return console.error(isError);
  }

  const slides = createSlides(categories, slidesToShow);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {slides.length > 0 ? (
          <Slide
            duration={5000}
            transitionDuration={500}
            infinite={false}
            indicators={true}
            arrows={false}
            className="w-full"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-center gap-4 overflow-x-auto"
              >
                {slide.map((category) => (
                  <div
                    key={category?.id}
                    className="flex-shrink-0 w-full md:w-1/3 lg:w-1/3 p-2"
                  >
                    <Link
                      to={`/san_pham/${category?.id}/san_pham_theo_the_loai`}
                      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full"
                    >
                      <div className="p-4 text-center">
                        <h3
                          className="text-sm md:text-base lg:text-lg text-gray-900 font-semibold"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {category?.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </Slide>
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy danh mục</p>
        )}
      </div>
    </div>
  );
};

export default Category;
