import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Để sử dụng các kiểu dáng mặc định
import Prd from "../../../../assets/img/product.jpg";
import Prd2 from "../../../../assets/img/product.jpg";
import Prd3 from "../../../../assets/img/product.jpg";
import { Link } from "react-router-dom";

const slideImages = [
  {
    url: Prd,
    title: "Giải pháp điều khiển công nghiệp chuyên nghiệp",
    description:
      "Tại Chilron, chúng tôi cung cấp các thiết bị điều khiển tiên tiến cho nồi hơi, đầu đốt, bếp gas, và lò dầu nhiệt để đáp ứng mọi yêu cầu của bạn về hiệu suất và độ tin cậy.",
  },
  {
    url: Prd2,
    title: "Cải tiến công nghệ cho hiệu suất tối ưu",
    description:
      "Khám phá các giải pháp công nghệ tiên tiến của chúng tôi, từ nồi hơi đến lò dầu nhiệt.",
  },
  {
    url: Prd3,
    title: "Đổi mới công nghệ điều khiển",
    description:
      "Nâng cấp hệ thống điều khiển của bạn với các sản phẩm hàng đầu và dịch vụ chất lượng cao.",
  },
];

const Banner = () => {
  return (
    <section
      id="hero"
      className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <Slide>
          {slideImages.map((slide, index) => (
            <div
              key={index}
              className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="space-y-6">
                <h1 className=" md:text-18 lg:text-24 font-bold mb-4">
                  {slide.title}
                </h1>
                <p className=" md:text-16 mb-6">{slide.description}</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link
                    to="/san_pham/tat_ca_san_pham"
                    className="inline-flex items-center justify-center text-white rounded-md bg-custom-red px-6 py-3 text-14 font-medium transition-colors hover:bg-red-600"
                  >
                    Khám phá sản phẩm
                  </Link>
                  <Link
                    to="#"
                    className="inline-flex items-center justify-center rounded-md border border-custom-red px-6 py-3 text-14 font-medium transition-colors hover:bg-primary-foreground hover:bg-red-200"
                  >
                    Dịch vụ của chúng tôi
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={slide.url}
                  alt="Product display"
                  className="rounded-lg shadow-lg w-[400px]"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </section>
  );
};

export default Banner;
