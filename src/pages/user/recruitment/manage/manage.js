import React from "react";
import ManageNav from "./manageNav";
import useUserInfo from "../../../../hooks/useUserInfo";

const Manage = () => {
  const { userApplyList, loading, error } = useUserInfo();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="banner p-4 rounded-lg shadow-md">
      <ManageNav />
      <hr className="border-zinc-900 my-4" />
      <h5 className="text-20 font-semibold mb-4">Quản lý tuyển dụng</h5>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Tên Công Việc</th>
            <th className="border p-2">CV</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {userApplyList.length > 0 ? (
            userApplyList.map((application) => (
              <tr key={application.id} className="text-center">
                <td className="border p-2">{application.fullname}</td>
                <td className="border p-2">
                  {new Date(application.created_date).toLocaleDateString()}
                </td>
                <td className="border p-2">{application.job_title}</td>
                <td className="border p-2">
                  <a
                    href={application.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View CV
                  </a>
                </td>
                <td className="border p-2">
                  <span
                    className={`p-1 rounded ${
                      application.status === "pending"
                        ? "bg-yellow-400 text-yellow-800"
                        : application.status === "rejected"
                        ? "bg-red-400 text-red-800"
                        : application.status === "approved"
                        ? "bg-green-400 text-green-800"
                        : "bg-gray-400 text-gray-800" // Default color if status doesn't match
                    }`}
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No Applications Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Manage;
