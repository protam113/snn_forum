import React, { useState, useEffect } from "react";
import {
  FaDollarSign,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLink,
  FaCalendarAlt,
} from "react-icons/fa";
import { salary } from "../../../data/SalaryRange";
import useRecruitment from "../../../hooks/useRecruitment";
import { toast } from "react-toastify";
import LocationSelectorp from "../../../components/Location/LocationP";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

const EdtRecruitment = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { recruitment, editRecruitment, loading } = useRecruitment(postId);
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

  useEffect(() => {
    if (recruitment) {
      setFormData({
        content: recruitment.content || "",
        link: recruitment.link || "",
        date: recruitment.date || "",
        experience: recruitment.experience || "",
        quantity: recruitment.quantity || "",
        work: recruitment.work || "",
        job_detail: recruitment.job_detail || "",
        mail: recruitment.mail || "",
        phone_number: recruitment.phone_number || "",
        salary: recruitment.salary || "",
        location: recruitment.location || "",
      });
      setLocation(recruitment.location || "");
    }
  }, [recruitment]);

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setFormData((prev) => ({
      ...prev,
      location: `${province}, ${district}`,
    }));
  };

  const handleChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await editRecruitment(formData);
      toast.success("Tin tuyển dụng đã được cập nhật thành công!");
      navigate(-1);
    } catch (error) {
      console.error(
        "Error updating recruitment:",
        error.response?.data || error.message
      );
      toast.error("Đã xảy ra lỗi khi cập nhật tin tuyển dụng.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-white shadow-md rounded-lg">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Chỉnh Sửa Tin Tuyển Dụng
        </h1>
        <p className="text-gray-600 mt-2">
          Cung cấp các thông tin dưới đây để cập nhật bài đăng tuyển dụng của
          bạn.
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
                <FaPhone className="text-gray-500" /> Số Lượng
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Nhập số lượng"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Công Việc */}
            <div>
              <label
                htmlFor="work"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaMapMarkerAlt className="text-gray-500" /> Công Việc
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
                <option value="part-time">Bán Thời Gian</option>
                <option value="full-time">Toàn Thời Gian</option>
              </select>
            </div>

            {/* Chi Tiết Công Việc */}
            <div>
              <label
                htmlFor="job_detail"
                className="text-sm font-medium mb-1 block"
              >
                Chi Tiết Công Việc
              </label>
              <ReactQuill
                value={formData.job_detail}
                onChange={(value) => handleChange(value, "job_detail")}
                className="mb-6"
                placeholder="What's on your mind?"
                style={{ height: "12rem" }}
              />
            </div>
          </div>

          {/* Cột Phải */}
          <div className="grid gap-6">
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
                placeholder="example@company.com"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Số Điện Thoại */}
            <div>
              <label
                htmlFor="phone_number"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaPhone className="text-gray-500" /> Số Điện Thoại
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            {/* Mức Lương */}
            <div>
              <label
                htmlFor="salary"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaDollarSign className="text-gray-500" /> Mức Lương
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
                {salary.map((s) => (
                  <option key={s.range} value={s.range}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Địa Điểm */}
            <div>
              <label
                htmlFor="location"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaMapMarkerAlt className="text-gray-500" /> Địa Điểm
              </label>
              <LocationSelectorp
                onLocationChange={handleLocationChange}
                selectedLocation={location}
              />
            </div>
          </div>

          {/* Nút Gửi */}
          <div className="col-span-2 text-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Đang Cập Nhật..." : "Cập Nhật Tin Tuyển Dụng"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EdtRecruitment;
