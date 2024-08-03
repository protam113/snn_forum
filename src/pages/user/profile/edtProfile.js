import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Example from "../../error/load";
import Block from "../../../components/design/Block";
import useUserInfo from "../../../hooks/useUserInfo";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    location: "",
    about: "",
    profile_image: null,
    profile_bg: null,
    link: "",
  });

  const navigate = useNavigate(); // Hook để điều hướng

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" || name === "profile_bg") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await updateUserInfo(data);
      toast.success("Profile updated successfully");
      if (userInfo && userInfo.username) {
        navigate(`/profile/${userInfo.username}`); // Chuyển hướng sau khi cập nhật thành công
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setFormData({
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        phone_number: userInfo.phone_number || "",
        location: userInfo.location || "",
        about: userInfo.about || "",
        profile_image: null,
        profile_bg: null,
        link: userInfo.link || "",
      });
    }
  }, [userInfo]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Example />
      </div>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image
          </label>
          <input
            type="file"
            name="profile_image"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Background
          </label>
          <input
            type="file"
            name="profile_bg"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link
          </label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
