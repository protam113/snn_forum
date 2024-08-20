import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import useEditApplyJob from "../../../hooks/useEditApplyJob";
import useApplicationsList from "../../../hooks/useApplicationsList";
import Loading from "../../error/load";

const ApplicationsList = () => {
  const { id: postId } = useParams();
  const {
    applications,
    loading: loadingApplications,
    error: errorApplications,
  } = useApplicationsList(postId);
  const {
    loading: loadingEdit,
    error: errorEdit,
    editApplyJob,
  } = useEditApplyJob(postId);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  const handleProfileClick = (userId, username) => {
    if (userInfo && userInfo.id === userId) {
      navigate(`/profile/${userInfo.username}`);
    } else {
      navigate(`/profile_user/${userId}`);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const result = await editApplyJob(applicationId, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loadingApplications || loadingEdit)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  if (errorApplications || errorEdit)
    return (
      <p className="text-center py-4 text-red-500">
        Error: {errorApplications || errorEdit}
      </p>
    );

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="border-b bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-6 text-left">#</th>
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
              <tr key={application.id} className="border-b text-sm">
                <td className="py-4 px-6 text-gray-800">{index + 1}</td>
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
                  <select
                    value={application.status} // Use the local status from the application object
                    onChange={(e) =>
                      handleStatusChange(application.id, e.target.value)
                    }
                    className={`p-1 rounded ${
                      application.status === "pending"
                        ? "bg-yellow-400 text-yellow-800"
                        : application.status === "approved"
                        ? "bg-green-400 text-green-800"
                        : "bg-red-400 text-red-800"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
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
