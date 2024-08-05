import React from "react";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import ManageNav from "./manageNav";
import ManageInfo from "./ManageInfo";

const Manage = () => {
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
            <th className="border p-2">Phone</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {appointments && appointments.length > 0
          ? appointments.map((appointment) => ( */}
          <tr
            //    key={appointment._id}
            className="text-center"
          >
            <td className="border p-2">{/* {appointment.name} */} Hoang</td>
            <td className="border p-2">
              {/* {appointment.appointment_date.substring(0, 16)} */} 25/03/2003
            </td>
            <td className="border p-2">
              {/* {appointment.phone} */}0906723985
            </td>
            <td className="border p-2">{/* {appointment.title} */}1232131</td>
            <td className="border p-2">
              <select
                className="p-1 rounded 
                    "
                // value={appointment.status}
                // onChange={(e) =>
                //   handleUpdateStatus(appointment._id, e.target.value)
                // }
              >
                <option value="Pending" className="value-pending">
                  Pending
                </option>
                <option value="Accepted" className="value-accepted">
                  Accepted
                </option>
                <option value="Rejected" className="value-rejected">
                  Rejected
                </option>
              </select>
            </td>
            <td className="border p-2 flex justify-center items-center">
              {/* {appointment.hasVisited === true ? ( */}
              <GoCheckCircleFill className="text-green-500 mx-1" />
              {/* ) : ( */}
              <AiFillCloseCircle className="text-red-500 mx-1" />
              {/* )} */}
              <MdDelete
                className="text-red-500 cursor-pointer mx-1"
                // onClick={() => handleDeleteAppointment(appointment._id)}
              />
            </td>
          </tr>
          {/* ))
          : <tr><td colSpan="6" className="text-center p-4">No Appointments Found!</td></tr>} */}
        </tbody>
      </table>
    </div>
  );
};

export default Manage;
