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
} from "react-icons/fa"; // Sử dụng các icon từ react-icons
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
      <div className="grid gap-6">
        {/* Title and Meta Information */}
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{recruitment.content}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{recruitment.work}</span>
            <span>•</span>
            <span>{recruitment.location}</span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <FaEnvelope className="w-5 h-5 text-gray-500" />
              <span>{recruitment.mail}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="w-5 h-5 text-gray-500" />
              <span>{recruitment.phone_number}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLink className="w-5 h-5 text-gray-500" />
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

          {/* Additional Details */}
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5 text-gray-500" />
              <span>{new Date(recruitment.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="w-5 h-5 text-gray-500" />
              <span>{recruitment.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="w-5 h-5 text-gray-500" />
              <span>{recruitment.quantity} positions</span>
            </div>
          </div>
        </div>

        {/* Salary and Job Details */}
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <FaDollarSign className="w-5 h-5 text-gray-500" />
            <span>{recruitment.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClipboard className="w-5 h-5 text-gray-500" />
            <span>{recruitment.job_detail}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetail;
