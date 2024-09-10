import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useStaticalJobPostGeneral } from "../../../../../../hooks/Statistical/StaticalJobPostGeneral";

export default function StaticalJobPostGeneral() {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [mostAppliedJobs, setMostAppliedJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MM"));
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: `Tháng ${i + 1}`,
  }));

  useEffect(() => {
    const startOfMonth = dayjs()
      .month(selectedMonth - 1)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = dayjs()
      .month(selectedMonth - 1)
      .endOf("month")
      .format("YYYY-MM-DD");
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  }, [selectedMonth]);

  const {
    data: staticalJobPostGeneral,
    isLoading,
    error,
  } = useStaticalJobPostGeneral(startDate, endDate);

  useEffect(() => {
    if (!isLoading && !error && staticalJobPostGeneral) {
      // Kiểm tra và xử lý dữ liệu cho biểu đồ cột
      const barChartData = staticalJobPostGeneral.job_post_counts
        ? staticalJobPostGeneral.job_post_counts.map((entry) => ({
            date: dayjs(entry.date).format("DD-MM-YYYY"),
            total_posts: entry.total_posts,
            total_applications: entry.total_applications,
            total_approved: entry.total_approved,
            total_rejected: entry.total_rejected,
            total_pending: entry.total_pending,
          }))
        : [];

      setBarChartData(barChartData);
      setTotalApplications(staticalJobPostGeneral.total_applications);

      // Kiểm tra và xử lý dữ liệu cho biểu đồ pie tổng quan đơn xin việc
      const pieChartData = [
        {
          name: "Approved",
          value: staticalJobPostGeneral.total_approved_applications || 0,
        },
        {
          name: "Pending",
          value: staticalJobPostGeneral.total_pending_applications || 0,
        },
        {
          name: "Rejected",
          value: staticalJobPostGeneral.total_rejected_applications || 0,
        },
      ];

      setPieChartData(pieChartData);

      // Kiểm tra và xử lý dữ liệu cho biểu đồ pie bài đăng việc làm được ứng tuyển nhiều nhất
      const mostAppliedJobsData = staticalJobPostGeneral.most_applied_job_posts
        ? staticalJobPostGeneral.most_applied_job_posts.map((job) => ({
            name: job.content,
            value: job.application_count,
          }))
        : [];

      setMostAppliedJobs(mostAppliedJobsData);
    } else if (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    }
  }, [staticalJobPostGeneral, isLoading, error]);

  return (
    <div>
      <select
        id="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      {/* Biểu đồ cột: Số lượng bài đăng việc làm và đơn ứng tuyển */}
      <div className="w-full h-80 mb-8">
        <h3 className="text-xl font-bold mb-4">
          Số Lượng Bài Đăng Việc Làm Và Đơn Ứng Tuyển Theo Ngày
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="total_posts"
              fill="#8884d8"
              name="Bài Đăng Việc Làm"
            />
            <Bar
              dataKey="total_applications"
              fill="#82ca9d"
              name="Đơn Ứng Tuyển"
            />
            <Bar dataKey="total_approved" fill="#ffc658" name="Đã Chấp Nhận" />
            <Bar dataKey="total_rejected" fill="#ff6f61" name="Đã Từ Chối" />
            <Bar dataKey="total_pending" fill="#d84a2d" name="Đang Chờ Xử Lý" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ pie tổng quan đơn xin việc */}
      <div className="w-full h-80 mb-8">
        <h3 className="text-xl font-bold mb-4">Tổng Quan Đơn Ứng Tuyển</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              <Cell fill="#00C49F" />
              <Cell fill="#FFBB28" />
              <Cell fill="#FF8042" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ pie bài đăng việc làm được ứng tuyển nhiều nhất */}
      <div className="w-full h-80">
        <h3 className="text-xl font-bold mb-4">
          Bài Đăng Việc Làm Được Ứng Tuyển Nhiều Nhất
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mostAppliedJobs}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              <Cell fill="#00C49F" />
              <Cell fill="#FFBB28" />
              <Cell fill="#FF8042" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <p>Tổng Số Đơn Ứng Tuyển: {totalApplications}</p>
      </div>
    </div>
  );
}
