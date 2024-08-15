import React, { useState } from "react";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaCalendarAlt,
} from "react-icons/fa";
import { salary } from "../../../data/SalaryRange";
import { provinces } from "../../../data/DataLocat";
import useRecruitment from "../../../hooks/useRecruitment";
import { toast } from "react-toastify";
import LocationSelectorp from "../../../components/Location/LocationP";

const CreateRecruitment = () => {
  const { addRecruitment, loading } = useRecruitment();

  const [formData, setFormData] = useState({
    content: "",
    link: "",
    date: "",
    experience: "",
    quantity: "",
    work: "",
    job_detail: "",
    mail: "",
    phone_number: "",
    salary: "",
    location: "",
  });

  const [location, setLocation] = useState("");

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setFormData((prev) => ({
      ...prev,
      location: `${province}, ${district}`,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log giá trị của formData để kiểm tra dữ liệu
    console.log("Form Data:", formData);

    // Kiểm tra tất cả các trường thông tin
    if (
      !formData.content ||
      !formData.link ||
      !formData.date ||
      !formData.experience ||
      !formData.quantity ||
      !formData.work ||
      !formData.job_detail ||
      !formData.mail ||
      !formData.phone_number ||
      !formData.salary ||
      !formData.location // Bao gồm location trong kiểm tra
    ) {
      console.log("Validation Failed: ", {
        content: formData.content,
        link: formData.link,
        date: formData.date,
        experience: formData.experience,
        quantity: formData.quantity,
        work: formData.work,
        job_detail: formData.job_detail,
        mail: formData.mail,
        phone_number: formData.phone_number,
        salary: formData.salary,
        location: formData.location,
      });
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await addRecruitment(formData); // Truyền formData trực tiếp
      toast.success("Tin tuyển dụng đã được đăng thành công!");
      setFormData({
        content: "",
        link: "",
        date: "",
        experience: "",
        quantity: "",
        work: "",
        job_detail: "",
        mail: "",
        phone_number: "",
        salary: "",
        location: "", // Reset location as well
      });
    } catch (error) {
      console.error(
        "Error adding recruitment:",
        error.response?.data || error.message
      );
      toast.error("Đã xảy ra lỗi khi đăng tin tuyển dụng.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white shadow-md rounded-lg">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Đăng Tin Tuyển Dụng Mới
        </h1>
        <p className="text-gray-600 mt-2">
          Cung cấp các thông tin dưới đây để tạo bài đăng tuyển dụng của bạn.
        </p>
      </header>

      <main>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          onSubmit={handleSubmit}
        >
          {/* Cột Trái */}
          <div className="grid gap-6">
            {/* Nội Dung Bổ Sung */}
            <div>
              <label
                htmlFor="content"
                className="text-sm font-medium mb-1 block"
              >
                Nội Dung Bổ Sung
              </label>
              <textarea
                id="content"
                name="content"
                rows={2}
                value={formData.content}
                onChange={handleChange}
                placeholder="Thêm nội dung bổ sung..."
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>
            </div>

            {/* Liên Kết */}
            <div>
              <label
                htmlFor="link"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaLink className="text-gray-500" /> Liên Kết
              </label>
              <input
                id="link"
                name="link"
                type="url"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://company.com/jobs"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Ngày và Kinh Nghiệm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="text-sm font-medium flex items-center gap-2 mb-1"
                >
                  <FaCalendarAlt className="text-gray-500" /> Ngày
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="text-sm font-medium flex items-center gap-2 mb-1"
                >
                  Kinh Nghiệm
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
                >
                  <option value="" disabled>
                    Chọn mức kinh nghiệm
                  </option>
                  <option value="entry">Cấp độ mới vào nghề</option>
                  <option value="mid">Cấp độ trung cấp</option>
                  <option value="senior">Cấp độ cao cấp</option>
                </select>
              </div>
            </div>

            {/* Số Lượng */}
            <div>
              <label
                htmlFor="quantity"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                Số Lượng
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="1"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Loại Công Việc */}
            <div>
              <label
                htmlFor="work"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                Loại Công Việc
              </label>
              <select
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="" disabled>
                  Chọn loại công việc
                </option>
                <option value="full-time">Toàn thời gian</option>
                <option value="part-time">Bán thời gian</option>
                <option value="contract">Hợp đồng</option>
              </select>
            </div>
          </div>

          {/* Cột Phải */}
          <div className="grid gap-6">
            {/* Vị trí */}
            <div>
              <label
                htmlFor="location"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaMapMarkerAlt className="text-gray-500" /> Địa Điểm
              </label>
              <LocationSelectorp
                selectedProvince={formData.location.split(", ")[0] || ""}
                selectedDistrict={formData.location.split(", ")[1] || ""}
                onLocationChange={handleLocationChange}
              />
            </div>

            {/* Mô Tả Công Việc */}
            <div>
              <label
                htmlFor="job_detail"
                className="text-sm font-medium mb-1 block"
              >
                Mô Tả Công Việc
              </label>
              <textarea
                id="job_detail"
                name="job_detail"
                rows={2}
                value={formData.job_detail}
                onChange={handleChange}
                placeholder="Mô tả công việc..."
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="mail"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaEnvelope className="text-gray-500" /> Email
              </label>
              <input
                id="mail"
                name="mail"
                type="email"
                value={formData.mail}
                onChange={handleChange}
                placeholder="contact@company.com"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Điện Thoại */}
            <div>
              <label
                htmlFor="phone_number"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaPhone className="text-gray-500" /> Điện Thoại
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="0123456789"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Lương */}
            <div>
              <label
                htmlFor="salary"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaDollarSign className="text-gray-500" /> Lương
              </label>
              <select
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="" disabled>
                  Chọn mức lương
                </option>
                {salary.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Đang đăng..." : "Đăng Tin"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateRecruitment;
