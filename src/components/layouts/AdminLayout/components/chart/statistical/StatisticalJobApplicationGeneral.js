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
import dayjs from "dayjs";
import { useStatisticalJobApplicationGeneral } from "../../../../../../hooks/Statistical/StatisticalJobApplicationGeneral";

export default function JobApplicationGeneral() {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
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
    data: statisticalJobApplicationGeneral,
    isLoading,
    error,
  } = useStatisticalJobApplicationGeneral(startDate, endDate);

  useEffect(() => {
    if (!isLoading && !error && statisticalJobApplicationGeneral) {
      // Kiểm tra dữ liệu cho biểu đồ cột
      const barChartData =
        statisticalJobApplicationGeneral.job_application_counts &&
        Array.isArray(statisticalJobApplicationGeneral.job_application_counts)
          ? statisticalJobApplicationGeneral.job_application_counts.map(
              (entry) => ({
                date: dayjs(entry.date).format("DD-MM-YYYY"),
                total_applications: entry.total_applications,
              })
            )
          : [];

      setBarChartData(barChartData);
      setTotalApplications(statisticalJobApplicationGeneral.total_applications);

      // Kiểm tra dữ liệu cho biểu đồ pie
      const pieChartData = [
        {
          name: "Approved",
          value: statisticalJobApplicationGeneral.total_approved || 0,
        },
        {
          name: "Pending",
          value: statisticalJobApplicationGeneral.total_pending || 0,
        },
        {
          name: "Rejected",
          value: statisticalJobApplicationGeneral.total_rejected || 0,
        },
      ];

      setPieChartData(pieChartData);
    } else if (error) {
    }
  }, [statisticalJobApplicationGeneral, isLoading, error]);

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

      <div className="w-full h-80 mb-8">
        <h3 className="text-xl font-bold mb-4">
          Biểu Đồ Cột Số Lượng Đơn Xin Việc Theo Ngày
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_applications" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-80">
        <h3 className="text-xl font-bold mb-4">
          Biểu Đồ Pie Tổng Quan Đơn Xin Việc
        </h3>
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

      <div className="mt-4">
        <p>Total Applications: {totalApplications}</p>
      </div>
    </div>
  );
}
