import React, { useState } from "react";
import useRecruitment from "../../../hooks/useRecruitment";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const ApplyRecruitment = () => {
  const { id: postId } = useParams();
  const { addApplyJob, error } = useRecruitment();
  const navigate = useNavigate();

  // Check if postId is properly received
  console.log("postId:", postId);

  const [cv, setCv] = useState(null);
  const [preview, setPreview] = useState(null);
  const [job_title, setJobTitle] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState(""); // Use "true" or "false"
  const [age, setAge] = useState("");

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

  // Khi gọi addApplyJob
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
        postId // Đảm bảo postId được truyền vào đây
      );
      toast.success("Application submitted successfully!");
      // navigate(-1); // Redirect or handle accordingly
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while applying for the job.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-gray-700">
            Upload CV (PDF or Image)
          </label>
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />

          {preview && (
            <div className="relative mt-2">
              {cv && cv.type.includes("image") ? (
                <img
                  src={preview}
                  alt="CV Preview"
                  className="w-full h-48 object-contain border rounded"
                />
              ) : (
                <iframe
                  src={preview}
                  title="CV Preview"
                  className="w-full h-48 border rounded"
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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyRecruitment;
