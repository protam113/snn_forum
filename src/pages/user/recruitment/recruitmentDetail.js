import React from "react";
import { useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaLink,
  FaCalendarAlt,
  FaBriefcase,
  FaUsers,
  FaDollarSign,
  FaClipboard,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Loading from "../../error/load";
import useRecruitment from "../../../hooks/useRecruitment";

const RecruitmentDetail = () => {
  const { id: postId } = useParams();
  const { recruitment, loading, error } = useRecruitment(postId);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recruitment) {
    return <p>No details available</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="flex gap-6">
        {/* Job Details */}
        <div className="w-3/4">
          <div className="mb-6">
            {/* Title and Image */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Placeholder for image */}
                <span className="text-gray-400 text-xl">Logo</span>
              </div>
              <div className="text-16 font-bold">{recruitment.content}</div>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="flex text-14 flex-col items-center">
              <div className="bg-custom-red text-white p-1 rounded-full">
                <FaDollarSign className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Mức lương</span>
              <span className="mt-1 font-bold">{recruitment.salary} Triệu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-custom-red text-white p-2 rounded-full">
                <FaBriefcase className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Địa điểm</span>
              <span className="mt-1 font-bold">{recruitment.location}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-custom-red text-white p-2 rounded-full">
                <FaDollarSign className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Kinh Nghiệm</span>
              <span className="mt-1 font-bold">{recruitment.experience}</span>
            </div>
          </div>

          <div className="mb-6">
            <a
              href={`/tuyen_dung/${postId}/ung_tuyen`}
              className="inline-block py-2 px-8 bg-custom-red text-white rounded-lg text-16 font-semibold hover:bg-red-500 transition duration-300 w-full max-w-xs text-center"
            >
              Apply Now
            </a>
          </div>
        </div>

        {/* User Profile Information */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <img
              src={recruitment.user.profile_image}
              alt={`${recruitment.user.first_name} ${recruitment.user.last_name}`}
              className="w-16 h-16 bg-gray-200 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-16 font-bold">{`${recruitment.user.first_name} ${recruitment.user.last_name}`}</h3>
              <span className="text-gray-600">{recruitment.user.username}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-18 font-semibold mb-4">Thông tin liên lạc</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-gray-500 h-6 w-6" />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Location</h4>
              <p>{recruitment.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaLink className="text-gray-500 h-6 w-6" />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Website</h4>
              <a
                href={recruitment.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {recruitment.link}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-gray-500 h-6 w-6" />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Email</h4>
              <p>{recruitment.mail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone className="text-gray-500 h-6 w-6" />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Phone</h4>
              <p>{recruitment.phone_number}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaUsers className="text-gray-500 h-6 w-6" />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Positions</h4>
              <p>{recruitment.quantity} positions</p>
            </div>
          </div>
        </div>
        <div className="prose mb-4">
          <h4 className="text-18 font-semibold">Chi tiết công việc</h4>
          <p className="text-14">{recruitment.job_detail}</p>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetail;
