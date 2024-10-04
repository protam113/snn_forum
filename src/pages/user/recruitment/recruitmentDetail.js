import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaEnvelope,
  FaPhone,
  FaLink,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Loading from "../../error/load";
import { HiMiniUserGroup } from "react-icons/hi2";
import { useTheme } from "../../../context/themeContext";
import { BsClock } from "react-icons/bs";
import { MdOutlineWork } from "react-icons/md";
import { useRecruitmentDetail } from "../../../hooks/Recruitment/useRecruitment";
import { useUser } from "../../../context/UserProvider";

const RecruitmentDetail = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { id: postId } = useParams();
  const {
    data: recruitment,
    isLoading,
    isError,
    error,
  } = useRecruitmentDetail(postId);
  const { userInfo } = useUser();

  const handleProfileClick = (personId) => {
    if (userInfo && userInfo.id.toString() === personId) {
      navigate(`/profile/${userInfo.id}`);
    } else {
      navigate(`/profile/${personId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>
        Error: {error}
      </p>
    );
  }

  if (!recruitment) {
    return (
      <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>
        No details available
      </p>
    );
  }

  const isOwner =
    userInfo && recruitment.user && userInfo.id === recruitment.user.id;

  return (
    <div
      className={`max-w-4xl mx-auto p-6 sm:p-8 md:p-10 ${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Job Details */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src="https://static.chotot.com/storage/chotot-icons/png/jobtype_v2/2.png"
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="text-16 font-bold">{recruitment.content}</div>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="text-white p-2 rounded-full bg-main-blue2">
                <FaDollarSign className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Mức lương</span>
              <span className="mt-1 font-bold">{recruitment.salary} Triệu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white p-2 rounded-full bg-main-blue2">
                <FaMapMarkerAlt className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Địa điểm</span>
              <span className="mt-1 font-bold">{recruitment.location}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white p-2 rounded-full bg-main-blue2">
                <BsClock className="text-3xl" />
              </div>
              <span className="mt-2 text-gray-600">Kinh Nghiệm</span>
              <span className="mt-1 font-bold">{recruitment.experience}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href={`/tuyen_dung/${postId}/ung_tuyen`}
              className="inline-block py-2 px-8 bg-main-blue2 text-white rounded-lg text-16 font-semibold transition duration-300 w-full sm:w-auto text-center
                 hover:bg-main-blue1"
            >
              Ứng tuyển ngay
            </a>

            {isOwner && (
              <a
                href={`/tuyen_dung/${postId}/danh_sach_ung_tuyen`}
                className={`inline-block py-2 px-8 bg-blue-500 text-white rounded-lg text-16 font-semibold hover:bg-blue-400 transition duration-300 w-full sm:w-auto text-center ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Danh sách đơn ứng tuyển
              </a>
            )}
          </div>

          {/* Job Details Section */}
        </div>
      </div>
      <div
        className="w-full p-6 rounded-lg  transition-all duration-300 "
        onClick={() => handleProfileClick(recruitment.user.id)}
      >
        <div className="flex items-center mb-6">
          <img
            src={recruitment.user.profile_image}
            alt={`${recruitment.user.first_name} ${recruitment.user.last_name}`}
            className="w-20 h-20 bg-gray-200 rounded-full border-2 border-white shadow-md"
          />
          <div className="ml-4">
            <h3 className="text-18 font-bold text-gray-900">{`${recruitment.user.first_name} ${recruitment.user.last_name}`}</h3>
            <span className="text-gray-700">@{recruitment.user.username}</span>
          </div>
        </div>
      </div>

      <div
        className={`bg-gray-100 p-4 rounded-lg ${
          theme === "dark" ? "bg-zinc-800 text-white" : "bg-white text-black"
        }`}
      >
        <h3 className="text-18 font-semibold mb-4">Thông tin liên lạc</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Khu vực</h4>
              <p>{recruitment.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaLink
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Link</h4>
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
            <HiMiniUserGroup
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Số lượng</h4>
              <p>{recruitment.quantity}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MdOutlineWork
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div
              className={`mt-6 ${
                theme === "dark" ? " text-white" : " text-black"
              } p-4 rounded-lg`}
            >
              <h3 className="text-18 font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recruitment.tags.map((tagObj) => (
                  <span
                    key={tagObj.id}
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {tagObj.tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Email</h4>
              <p>{recruitment.mail}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone
              className={`text-gray-500 h-6 w-6 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div className="flex-1">
              <h4 className="text-16 font-medium">Phone</h4>
              <p>{recruitment.phone_number}</p>
            </div>
          </div>
        </div>
        <div className="prose mb-4">
          <h4 className="text-18 font-semibold">Chi tiết công việc</h4>
          <p
            className={`mb-4 text-14 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            dangerouslySetInnerHTML={{ __html: recruitment.job_detail || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDetail;
