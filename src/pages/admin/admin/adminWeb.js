import React, { useEffect, useState } from "react";
import { useWeb } from "../../../hooks/useWeb";
import {
  FaImage,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useAdmin from "../../../hooks/useAdmin";
import Loading from "../../error/load";

const AdminWeb = () => {
  const { UpdateWeb } = useAdmin();
  const { data: web, error, isLoading } = useWeb();

  const [formData, setFormData] = useState({
    img: null,
    about: "",
    phone_number: "",
    mail: "",
    location: "",
    link: "",
  });

  useEffect(() => {
    if (web) {
      setFormData({
        img: null,
        about: web.about || "",
        phone_number: web.phone_number || "",
        mail: web.mail || "",
        location: web.location || "",
        link: web.link || "",
      });
    }
  }, [web]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Initialize FormData
    const formDataToSend = new FormData();

    // Append only non-null values to FormData
    if (formData.img) formDataToSend.append("img", formData.img);
    if (formData.about) formDataToSend.append("about", formData.about);
    if (formData.phone_number)
      formDataToSend.append("phone_number", formData.phone_number);
    if (formData.mail) formDataToSend.append("mail", formData.mail);
    if (formData.location) formDataToSend.append("location", formData.location);
    if (formData.link) formDataToSend.append("link", formData.link);

    // Perform update
    UpdateWeb(formDataToSend, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  if (isLoading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Admin Web
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hình ảnh */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3">
            <FaImage className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">
              Hình ảnh:
            </span>
          </div>
          <input
            type="file"
            name="img"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        {/* About */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center space-x-3">
            <AiOutlineInfoCircle className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">
              Thong tin về web :
            </span>
          </div>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-4 focus:ring-blue-600 focus:border-blue-600"
            rows="4"
            placeholder="Viết vài điều về công ty..."
          />
        </div>

        {/* Số điện thoại */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">
              Số điện thoại:
            </span>
          </div>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Nhập số điện thoại..."
          />
        </div>

        {/* Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">Email:</span>
          </div>
          <input
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Nhập địa chỉ email..."
          />
        </div>

        {/* Vị trí */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">
              Khu vực (Địa chỉ):
            </span>
          </div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Nhập vị trí..."
          />
        </div>

        {/* Liên kết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center space-x-3">
            <FaLink className="text-blue-600 text-2xl" />
            <span className="text-18 font-semibold text-gray-700">
              Liên kết:
            </span>
          </div>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-600 focus:border-blue-600"
            placeholder="Nhập liên kết..."
          />
        </div>

        {/* Nút cập nhật */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWeb;
