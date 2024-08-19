import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
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
            <th className="border p-2">Job Title</th>
            <th className="border p-2">CV</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
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
                  <select
                    className="p-1 rounded"
                    value={application.status}
                    // onChange={(e) => handleUpdateStatus(application.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="border p-2 flex justify-center items-center">
                  {application.status === "accepted" ? (
                    <GoCheckCircleFill className="text-green-500 mx-1" />
                  ) : (
                    <AiFillCloseCircle className="text-red-500 mx-1" />
                  )}
                  <MdDelete
                    className="text-red-500 cursor-pointer mx-1"
                    // onClick={() => handleDeleteApplication(application.id)}
                  />
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
