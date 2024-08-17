// components/Main.js
import {
  FaSearch,
  FaUserCircle,
  FaTh,
  FaList,
  FaUsers,
  FaFlag,
  FaArrowsAltH,
} from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";

const AdHome = () => {
  return (
    <div className="flex-1 pl-14 sm:pl-60">
      <main className="p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Total Categories</div>
            <div className="text-sm text-gray-600">
              The total number of categories in the system.
            </div>
            <div className="text-4xl font-bold">125</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Active Users</div>
            <div className="text-sm text-gray-600">
              The total number of active users in the system.
            </div>
            <div className="text-4xl font-bold">2,345</div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Live Banners</div>
            <div className="text-sm text-gray-600">
              The total number of live banners in the system.
            </div>
            <div className="text-4xl font-bold">78</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="font-semibold text-lg">Recent Categories</div>
            <div className="text-sm text-gray-600">
              The latest categories added to the system.
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Electronics</td>
                  <td className="px-6 py-4 whitespace-nowrap">electronics</td>
                  <td className="px-6 py-4 whitespace-nowrap">125</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaArrowsAltH className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Clothing</td>
                  <td className="px-6 py-4 whitespace-nowrap">clothing</td>
                  <td className="px-6 py-4 whitespace-nowrap">250</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaArrowsAltH className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Furniture</td>
                  <td className="px-6 py-4 whitespace-nowrap">furniture</td>
                  <td className="px-6 py-4 whitespace-nowrap">75</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaArrowsAltH className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Sports</td>
                  <td className="px-6 py-4 whitespace-nowrap">sports</td>
                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaArrowsAltH className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdHome;
