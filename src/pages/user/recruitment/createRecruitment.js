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
import LocationSelectorp from "../../../components/Location/LocationP";
import { useNavigate } from "react-router-dom";
import { useAddRecruitment } from "../../../hooks/Recruitment/useRecruitment";
import TagsList from "./components/TagList";
import { useToastDesign } from "../../../context/ToastService";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  tablePlugin,
  InsertTable,
} from "@mdxeditor/editor";

const CreateRecruitment = () => {
  const { mutate: addRecruitmentMutation } = useAddRecruitment();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    link: "",
    date: "",
    experience: "",
    quantity: "",
    job_detail: "",
    mail: "",
    phone_number: "",
    salary: "",
    location: "",
    tag_id: [],
  });
  const { addNotification } = useToastDesign();

  const handleLocationChange = (formattedLocation) => {
    const [province, district] = formattedLocation.split(", ");
    setFormData((prev) => ({
      ...prev,
      location: `${province}, ${district}`,
    }));
  };

  const handleChange = (e) => {
    // Kiểm tra nếu sự kiện đến từ MDXEditor (chứa markdown)
    if (e.markdown !== undefined) {
      setFormData((prev) => ({ ...prev, job_detail: e.markdown }));
    }
    // Xử lý cho các input khác
    else if (e.target) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagChange = (newSelectedTags) => {
    setFormData((prev) => ({ ...prev, tag_id: newSelectedTags }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    // Kiểm tra tất cả các trường bắt buộc
    if (
      !formData.content ||
      !formData.link ||
      !formData.date ||
      !formData.experience ||
      !formData.quantity ||
      !formData.job_detail.trim() ||
      !formData.mail ||
      !formData.phone_number ||
      !formData.salary ||
      !formData.location ||
      formData.tag_id.length === 0
    ) {
      addNotification("Vui lòng điền đầy đủ thông tin.", "warning");
      return;
    }

    const newRecruitment = { ...formData };

    setLoading(true);
    try {
      await addRecruitmentMutation(newRecruitment, {
        onSuccess: () => {
          navigate(-1);
        },
        onError: () => {},
      });
    } catch (error) {
      console.error(
        "Error adding recruitment:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 md:p-10 bg-white shadow-md rounded-lg">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Đăng Tin Tuyển Dụng Mới
        </h1>
        <p className="text-gray-600 mt-2">
          Cung cấp các thông tin dưới đây để tạo bài đăng tuyển dụng của bạn.
        </p>
      </header>

      <main>
        {loading && <div className="loading-spinner">Loading...</div>}
        <form
          className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          onSubmit={handleSubmit}
        >
          {/* Cột 1 */}
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

            <div className="grid grid-cols-1 gap-6">
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
          </div>

          {/* Cột 2 */}
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
                htmlFor="mail"
                className="text-sm font-medium flex items-center gap-2 mb-1"
              >
                <FaEnvelope className="text-gray-500" /> Email Liên Hệ
              </label>
              <input
                id="mail"
                name="mail"
                type="email"
                value={formData.mail}
                onChange={handleChange}
                placeholder="example@example.com"
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
                placeholder="+84 123 456 789"
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
                {salary.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cột 3 */}
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="job_detail"
                className="text-sm font-medium mb-1 block"
              >
                Mô Tả Công Việc
              </label>
              <MDXEditor
                markdown={formData.job_detail}
                onChange={(markdown) => handleChange({ markdown })} // Chuyển đúng định dạng cho handleChange
                plugins={[
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <InsertTable />
                      </>
                    ),
                  }),
                  tablePlugin(),
                ]}
              />
            </div>

            <div>
              <TagsList
                selectedTags={formData.tag_id}
                onTagChange={handleTagChange}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Tạo Bài Đăng Tuyển Dụng
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateRecruitment;
