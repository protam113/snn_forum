import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import { toast } from "react-toastify";
import LocationSelector from "../../../components/Location/LocationSelector";
import Loading from "../../error/load";

const EditProfile = () => {
  const { userInfo, loading, error, updateUserInfo } = useUserInfo();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    about: "",
    profile_image: null,
    profile_bg: null,
    link: "",
  });
  const [location, setLocation] = useState({
    province: "",
    district: "",
  });
  const [previewImages, setPreviewImages] = useState({
    profile_image: "",
    profile_bg: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_image" || name === "profile_bg") {
      const file = files[0];
      setFormData((prevState) => ({
        ...prevState,
        [name]: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setLocation({
      province,
      district,
    });
    setFormData((prevState) => ({
      ...prevState,
      location: formattedLocation,
    }));
  };

  const handleDeleteImage = (imageType) => {
    setFormData((prevState) => ({
      ...prevState,
      [imageType]: null,
    }));
    setPreviewImages((prevState) => ({
      ...prevState,
      [imageType]: "",
    }));
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
      toast.success("Cập nhật thông tin thành công !");
      if (userInfo && userInfo.username) {
        navigate("/");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin!", err);
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
        <Loading />
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
          <LocationSelector
            selectedProvince={location.province}
            selectedDistrict={location.district}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <label
              htmlFor="profile_image"
              className="block text-sm font-medium mb-1"
            >
              Profile Image
            </label>
            <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
              <input
                id="profile_image"
                name="profile_image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {previewImages.profile_image ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImages.profile_image}
                    alt="Profile Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage("profile_image")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <AiOutlineDelete size={20} className="text-red-500" />
                  </button>
                </div>
              ) : (
                <>
                  <AiOutlinePlus className="text-gray-500" size={24} />
                  <span className="text-gray-500">Chọn hình ảnh</span>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 relative">
            <label
              htmlFor="profile_bg"
              className="block text-sm font-medium mb-1"
            >
              Profile Background
            </label>
            <div className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
              <input
                id="profile_bg"
                name="profile_bg"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {previewImages.profile_bg ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImages.profile_bg}
                    alt="Background Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage("profile_bg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <AiOutlineDelete size={20} className="text-red-500" />
                  </button>
                </div>
              ) : (
                <>
                  <AiOutlinePlus className="text-gray-500" size={24} />
                  <span className="text-gray-500">Chọn hình ảnh</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full h-32 resize-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link
          </label>
          <input
            type="url"
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
