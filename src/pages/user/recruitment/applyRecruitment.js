import React, { useRef, useState } from "react";
import useRecruitment from "../../../hooks/useRecruitment";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";

const ApplyRecruitment = () => {
  const { id: postId } = useParams();
  const { addApplyJob, submitting, loading, error } = useRecruitment();
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
      await addApplyJob(
        {
          job_title,
          fullname,
          phone_number,
          email,
          sex,
          age,
          cv,
        },
        postId
      );
      toast.success("Application submitted successfully!");
      navigate(-1); // Redirect or handle accordingly
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while applying for the job.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-24 font-bold mb-6">Apply for Job</h1>
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
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="mb-4 text-16">
            <label className="block text-gray-700">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={job_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Sex</label>
            <select
              name="sex"
              value={sex ? "true" : "false"}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select...</option>
              <option value="true">Male</option>
              <option value="false">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyRecruitment;
