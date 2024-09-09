import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAddApplyJob } from "../../../hooks/Recruitment/useRecruitment";

const ApplyRecruitment = () => {
  const { id: postId } = useParams();
  const { mutate: addApplyJobMutation } = useAddApplyJob(postId);
  const fileInputRef = useRef(null);
  const [cv, setCv] = useState(null);
  const [preview, setPreview] = useState(null);
  const [job_title, setJobTitle] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.includes("image") || file.type.includes("pdf"))) {
      setCv(file);
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    } else {
      setCv(null);
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setCv(null);
    setPreview(null);
    fileInputRef.current.value = null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value.length > 4) {
      toast.error("Age should not exceed 4 characters.");
      return;
    }
    if (name === "sex") {
      setSex(value === "true" ? true : false);
    } else {
      switch (name) {
        case "job_title":
          setJobTitle(value);
          break;
        case "fullname":
          setFullname(value);
          break;
        case "phone_number":
          setPhoneNumber(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "age":
          setAge(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) {
      toast.error("No CV was submitted.");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    try {
      await addApplyJobMutation({
        job_title,
        fullname,
        phone_number,
        email,
        sex,
        age,
        cv,
      });
      toast.success("Application submitted successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while applying for the job.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-24 font-bold mb-6">Nhập Thông Tin</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column for CV Upload and Preview */}
        <div>
          <div className="mb-4 text-16">
            <label className="block text-gray-700">
              Upload CV (PDF or Image)
            </label>
            <div className="relative flex items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
              <input
                id="file"
                name="file"
                type="file"
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                ref={fileInputRef}
              />

              <AiOutlinePlus className="text-gray-500" size={24} />
              <span className="text-gray-500">Chọn tệp</span>
            </div>

            {preview && (
              <div className="relative mt-4">
                {cv && cv.type.includes("image") ? (
                  <img
                    src={preview}
                    alt="CV Preview"
                    className="w-full h-72 object-contain border rounded-lg"
                  />
                ) : (
                  <iframe
                    src={preview}
                    title="CV Preview"
                    className="w-full h-72 border rounded-lg"
                  ></iframe>
                )}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column for Form Fields */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-4 bg-white shadow-md rounded-md border border-gray-300"
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Tên vị trí ứng tuyển:
            </label>
            <input
              type="text"
              name="job_title"
              value={job_title}
              onChange={handleChange}
              placeholder="Nhập tên vị trí ứng tuyển"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Họ tên:
            </label>
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              placeholder="Nhập họ tên của bạn"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Số điện thoại (Phone number):
            </label>
            <input
              type="text"
              name="phone_number"
              value={phone_number}
              onChange={handleChange}
              placeholder="Nhập số điện thoại của bạn"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Nhập địa chỉ email của bạn"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Giới tính:
            </label>
            <select
              name="sex"
              value={sex ? "true" : "false"}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Chọn giới tính...</option>
              <option value="true">Nam</option>
              <option value="false">Nữ</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Năm sinh:
            </label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
              placeholder="Nhập năm sinh của bạn"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyRecruitment;
