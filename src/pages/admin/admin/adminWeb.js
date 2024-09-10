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

    // Log FormData for debugging
    console.log([...formDataToSend.entries()]);

    // Perform update
    UpdateWeb(formDataToSend, {
      onSuccess: (data) => {
        console.log("Update successful:", data);
      },
      onError: (error) => {
        console.error(
          "Error updating web:",
          error.response ? error.response.data : error.message
        );
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Admin Web
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-3">
          <FaImage className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">
              Hình ảnh:
            </span>
            <input
              type="file"
              name="img"
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <AiOutlineInfoCircle className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">About:</span>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Write about the company..."
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">
              Số điện thoại:
            </span>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter phone number..."
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">Email:</span>
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email address..."
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">Vị trí:</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter location..."
            />
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <FaLink className="text-blue-500 text-xl" />
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold text-gray-700">
              Liên kết:
            </span>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter link..."
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default AdminWeb;
