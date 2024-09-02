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
import useRecruitment from "../../../hooks/useRecruitment";
import { toast } from "react-toastify";
import LocationSelectorp from "../../../components/Location/LocationP";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/themeContext";
import { useTags } from "../../../hooks/useTag";
import { marked } from "marked";
import ReactMarkdown from "react-markdown";
import Toolbar from "../../../components/design/Toolbar";

const CreateRecruitment = () => {
  const { addRecruitment, loading, submitting } = useRecruitment();
  const navigate = useNavigate();
  const { data: tags, isLoading } = useTags();

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

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setFormData((prev) => ({
      ...prev,
      location: `${province}, ${district}`,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      !formData.location
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const htmlContent = marked(formData.job_detail);

    try {
      await addRecruitment({
        ...formData,
        job_detail: htmlContent, // Lưu nội dung đã chuyển đổi thành HTML
      });
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
        location: "",
      });

      navigate(-1);
    } catch (error) {
      console.error(
        "Error adding recruitment:",
        error.response?.data || error.message
      );
      toast.error("Đã xảy ra lỗi khi đăng tin tuyển dụng.");
    }
  };

  const handleInsert = (text) => {
    setFormData((prev) => ({
      ...prev,
      job_detail: prev.job_detail + text,
    }));
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
            <div>
              <label
                htmlFor="content"
                className="text-sm font-medium mb-1 block"
              >
                Tiêu Đề Công Việc:
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
                {/* <option value="contract">Hợp đồng</option>
                <option value="internship">Thực Tập</option> */}
              </select>
            </div>
          </div>

          {/* Cột Phải */}
          <div className="grid gap-6">
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
            <div>
              <label
                htmlFor="job_detail"
                className="text-sm font-medium mb-1 block"
              >
                Mô Tả Công Việc
              </label>
              <Toolbar onInsert={handleInsert} />
              <textarea
                id="job_detail"
                name="job_detail"
                value={formData.job_detail}
                onChange={(e) => handleChange(e)}
                className="mb-6"
                placeholder="Mô tả công việc"
                rows={4}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="mt-4">
                <ReactMarkdown>{formData.job_detail}</ReactMarkdown>
              </div>
            </div>

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
                placeholder="0123456789"
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

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
                {salary.map((s, index) => (
                  <option key={index} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            >
              {submitting ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateRecruitment;
