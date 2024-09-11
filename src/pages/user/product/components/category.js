import React from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Loading from "../../../error/load";
import { useUserCategoryList } from "../../../../hooks/Product/useUserCategory";

const slidesToShow = 4;

const createSlides = (categories, slidesToShow) => {
  const slides = [];
  if (categories && categories.length > 0) {
    for (let i = 0; i < categories.length; i += slidesToShow) {
      slides.push(categories.slice(i, i + slidesToShow));
    }
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  const slides = createSlides(categories, slidesToShow);

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        {slides.length > 0 ? (
          <Slide
            duration={5000}
            transitionDuration={500}
            infinite={false}
            indicators={true}
            arrows={false}
          >
            {slides.map((slide, index) => (
              <div key={index} className="flex space-x-4 overflow-x-auto">
                {slide.map((category) => (
                  <div
                    key={category?.id}
                    className="flex-shrink-0 w-full sm:w-1/4 lg:w-1/5 p-2"
                    style={{ flexBasis: `calc(100% / ${slidesToShow})` }}
                  >
                    <Link
                      to={`/san_pham/${category?.id}/san_pham_theo_the_loai`}
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
          <p className="text-center text-gray-500">No Categories Found</p>
        )}
      </div>
    </div>
  );
};

export default Category;
