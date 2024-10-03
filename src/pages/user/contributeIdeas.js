import React, { useEffect } from "react";
import { RiStarLine } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useToastDesign } from "../../context/ToastService";
import { useWeb } from "../../hooks/useWeb";
import Loading from "../error/load";
import { IoLink } from "react-icons/io5";

const ContributeIdeas = () => {
  const { addNotification } = useToastDesign();
  const { data: web, error, isLoading } = useWeb();

  // Loading và Error handling

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", process.env.REACT_APP_ACCESS_KEY);

    try {
      const response = await fetch(process.env.REACT_APP_URL, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      // Kiểm tra định dạng của phản hồi
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.success) {
          addNotification("Gửi thành công!");
          event.target.reset();
        } else {
          console.error(data.message);
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Khởi tạo AOS khi component được mount
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="contact p-8 max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Gửi ý kiến hoặc báo cáo
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="contact-col mb-6 md:mb-0 md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Liên hệ với chúng tôi</h3>
          <p className="text-gray-600 mb-4">
            Hãy điền vào biểu mẫu dưới đây hoặc sử dụng thông tin liên lạc bên
            dưới.
          </p>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-center">
              <IoLink className="mr-2 text-gray-500" />
              <a href={web.link} className="hover:underline">
                {web.link}
              </a>
            </li>
            <li className="flex items-center">
              <IoMdMail className="mr-2 text-gray-500" />
              <a href={`mailto:${web.email}`} className="hover:underline">
                {web.email}
              </a>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2 text-gray-500" />
              <span>{web.phone_number}</span>
            </li>
          </ul>
        </div>
        <div className="contact-col md:w-1/2">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tên của bạn
              </label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên của bạn"
                required
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email của bạn
              </label>
              <input
                type="email"
                name="mail"
                placeholder="Nhập email của bạn"
                required
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại của bạn"
                required
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Tin nhắn
              </label>
              <textarea
                name="messages"
                placeholder="Nhập tin nhắn của bạn"
                required
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 h-32"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-main-blue2 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributeIdeas;
