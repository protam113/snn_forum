import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

const companyInfo = {
  id: 2,
  founder: {
    id: 3,
    username: "protam113",
    first_name: "Phạm Minh",
    last_name: "Hoàng",
    profile_image:
      "http://protam113.pythonanywhere.com/static/user/2024/08/logo.png",
    profile_bg:
      "http://protam113.pythonanywhere.com/static/user/2024/08/834a85693c4c531c03107596aa75ccd8.jpg",
  },
  name: "Cong ty viet nam cong hoa",
  founding_date: "2003-10-10",
  workers_number: 30,
  location: "Không biết",
  mail: "congty1@example.com",
  phone_number: "00000000",
  link: "https://www.facebook.com/profile.php?id=100032496816567&locale=vi_VN",
  status: "pending", // or "approved"
};

const ManageInfo = () => {
  const {
    founder,
    name,
    founding_date,
    workers_number,
    location,
    mail,
    phone_number,
    link,
    status,
  } = companyInfo;

  const statusClass =
    status === "approved"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Company Information */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h3 className="text-2xl font-bold mr-4">{name}</h3>
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${statusClass}`}
          >
            {status === "approved" ? (
              <FaCheckCircle className="mr-1" />
            ) : (
              <span className="mr-1">!</span>
            )}
            {status === "approved" ? "Approved" : "Pending"}
          </span>
        </div>
        <a
          href="/edit-company"
          className="text-blue-600 hover:underline flex items-center"
        >
          <FaEdit className="mr-2" />
          Edit
        </a>
      </div>

      {/* Founder Information */}
      <div className="flex items-center mb-6">
        <div className="relative flex-shrink-0 w-16 h-16 mr-4">
          <img
            src={founder.profile_image}
            alt={`${founder.first_name} ${founder.last_name}`}
            className="w-full h-full object-cover rounded-full border-2 border-gray-300"
          />
          <img
            src={founder.profile_bg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-full"
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{`${founder.first_name} ${founder.last_name}`}</h4>
          <p className="text-sm text-gray-600">@{founder.username}</p>
        </div>
      </div>

      {/* Company Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-blue-500" />
          <p>{location}</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-500" />
          <p>{phone_number}</p>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500" />
          <a href={`mailto:${mail}`} className="text-blue-600 hover:underline">
            {mail}
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <FaGlobe className="text-blue-500" />
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {link}
          </a>
        </div>
        <p>
          <strong>Founding Date:</strong>{" "}
          {new Date(founding_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Number of Workers:</strong> {workers_number}
        </p>
      </div>
    </div>
  );
};

export default ManageInfo;
