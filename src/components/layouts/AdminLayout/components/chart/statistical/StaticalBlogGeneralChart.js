// import React, { useEffect, useState } from "react";
// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Tooltip,
// } from "recharts";
// import { toast } from "react-toastify";
// import { useStaticalBlogGeneral } from "../../../../../../hooks/Statistical/StaticalBlogGeneral";
// import dayjs from "dayjs";

// export default function StaticalBlogGeneralChart() {
//   const [chartData, setChartData] = useState([]);
//   const [totalBlogs, setTotalBlogs] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState("01"); // Default to January

//   // Sử dụng hook với các tham số startDate và endDate
//   const startDate = `2024-${selectedMonth}-01`;
//   const lastDay = new Date(2024, parseInt(selectedMonth), 0).getDate();
//   const endDate = `2024-${selectedMonth}-${lastDay}`;

//   const {
//     data: staticalBlogGeneral,
//     isLoading,
//     error,
//   } = useStaticalBlogGeneral(startDate, endDate);

//   const handleMonthChange = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   useEffect(() => {
//     if (!isLoading && !error && staticalBlogGeneral) {
//       // Tạo dữ liệu cho biểu đồ
//       const data = [
//         {
//           subject: "Tổng Số Lượt Thích",
//           A: staticalBlogGeneral.total_likes || 0,
//         },
//         {
//           subject: "Tổng Số Bình Luận",
//           A: staticalBlogGeneral.total_comments || 0,
//         },
//         {
//           subject: "Tổng Số Tương Tác",
//           A: staticalBlogGeneral.total_interactions || 0,
//         },
//         {
//           subject: "Trung Bình Lượt Thích/Bài",
//           A: staticalBlogGeneral.average_likes_per_blog || 0,
//         },
//         {
//           subject: "Trung Bình Bình Luận/Bài",
//           A: staticalBlogGeneral.average_comments_per_blog || 0,
//         },
//         {
//           subject: "Trung Bình Tương Tác/Bài",
//           A: staticalBlogGeneral.average_interactions_per_blog || 0,
//         },
//       ];

//       setChartData(data);
//       setTotalBlogs(staticalBlogGeneral.total_blogs || 0);
//     } else if (error) {
//       toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
//     }
//   }, [staticalBlogGeneral, isLoading, error]);

//   return (
//     <div>
//       <select
//         onChange={handleMonthChange}
//         value={selectedMonth}
//         className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         {months.map((month) => (
//           <option key={month.value} value={month.value}>
//             {month.label}
//           </option>
//         ))}
//       </select>
//       <RadarChart
//         cx={300}
//         cy={250}
//         outerRadius={200}
//         width={600}
//         height={500}
//         data={chartData}
//       >
//         <PolarGrid />
//         <PolarAngleAxis dataKey="subject" />
//         <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
//         <Radar
//           name="Dữ Liệu"
//           dataKey="A"
//           stroke="#8884d8"
//           fill="#8884d8"
//           fillOpacity={0.6}
//         />
//         <Tooltip />
//       </RadarChart>
//     </div>
//   );
// }
