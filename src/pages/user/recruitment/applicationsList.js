import React from "react";
import useApplicationsList from "../../../hooks/useApplicationsList";
import { useNavigate, useParams } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";

const ApplicationsList = () => {
  const { id: postId } = useParams();
  const { applications, loading, error } = useApplicationsList(postId);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  const handleProfileClick = (userId, username) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-600 text-14">
            <th className="py-3 px-6 text-left">#</th>{" "}
            {/* Updated column header */}
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Họ tên</th>
            <th className="py-3 px-6 text-left">Vị trí ứng tuyển</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Created Date</th>
            <th className="py-3 px-6 text-left">CV</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-600">
                No applications available
              </td>
            </tr>
          ) : (
            applications.map((application, index) => (
              <tr key={application.id} className="border-b text-14">
                <td className="py-4 px-6 text-gray-800">{index + 1}</td>{" "}
                {/* Display index + 1 */}
                <td
                  className="py-4 px-6 text-gray-800 cursor-pointer hover:underline"
                  onClick={() =>
                    handleProfileClick(
                      application.user.id,
                      application.user.username
                    )
                  }
                >
                  {application.user.username}
                </td>
                <td className="py-4 px-6 text-gray-800">
                  {application.fullname}
                </td>
                <td className="py-4 px-6 text-gray-800">
                  {application.job_title}
                </td>
                <td className="py-4 px-6 text-gray-800">
                  <span
                    className={`p-1 rounded ${
                      application.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : application.status === "accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-800">
                  {new Date(application.created_date).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-gray-800">
                  <a
                    href={application.cv}
                    className="text-blue-500 hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View CV
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsList;
