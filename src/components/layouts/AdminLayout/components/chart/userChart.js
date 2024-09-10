import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { useStaticalUser } from "../../../../../hooks/Statistical/StaticalUser";
import dayjs from "dayjs";

const UserChart = () => {
  const [chartData, setChartData] = useState([]);

  // Tính toán ngày bắt đầu và kết thúc (12 tháng gần nhất)
  const endDate = dayjs().endOf("month").format("YYYY-MM-DD");
  const startDate = dayjs()
    .subtract(11, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  // Sử dụng hook để lấy dữ liệu thống kê người dùng
  const {
    data: staticalUser,
    isLoading,
    error,
  } = useStaticalUser(startDate, endDate);

  useEffect(() => {
    if (!isLoading && !error && staticalUser) {
      const monthlyData = [];

      // Tạo danh sách các tháng trong 12 tháng gần nhất
      for (let i = 0; i < 12; i++) {
        const month = dayjs()
          .subtract(11 - i, "months")
          .format("MMM YYYY");

        monthlyData.push({
          date: month,
          adminCount: 0,
          managerCount: 0,
          noGroupCount: 0,
        });
      }

      // Duyệt qua các dữ liệu thống kê và gán vào đúng vị trí tháng
      staticalUser.user_counts.forEach((entry) => {
        const monthYear = dayjs(entry.date).format("MMM YYYY");
        const data = monthlyData.find((d) => d.date === monthYear);

        if (data) {
          data.adminCount = entry.admin_count || 0;
          data.managerCount = entry.manager_count || 0;
          data.noGroupCount = entry.no_group_count || 0;
        }
      });

      // Kiểm tra dữ liệu trước khi đặt trạng thái
      setChartData(monthlyData);
    }
  }, [staticalUser, isLoading, error]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ height: "400px", width: "100%" }}>
          <h3>Biểu đồ đường</h3>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="adminCount" stroke="#8884d8" />
              <Line type="monotone" dataKey="managerCount" stroke="#82ca9d" />
              <Line type="monotone" dataKey="noGroupCount" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: "400px", width: "100%" }}>
          <h3>Biểu đồ cột</h3>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="adminCount" fill="#8884d8" />
              <Bar dataKey="managerCount" fill="#82ca9d" />
              <Bar dataKey="noGroupCount" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
