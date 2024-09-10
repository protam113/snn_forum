import React, { useState } from "react";
import { useRecruitmentList } from "../../../../../../hooks/Recruitment/useRecruitment";
import { useStaticalJobPostSpecific } from "../../../../../../hooks/Statistical/StaticalJobPostSpecific";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dayjs from "dayjs";

const StatucalJobPostSpecificChart = () => {
  const currentMonth = dayjs().month() + 1;
  const startOfMonth = dayjs().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs().endOf("month").format("YYYY-MM-DD");

  const [selectedJobPostId, setSelectedJobPostId] = useState(null);
  const [startDate, setStartDate] = useState(startOfMonth);
  const [endDate, setEndDate] = useState(endOfMonth);

  const { data: recruitments, error, isLoading } = useRecruitmentList();
  const {
    data: staticalData,
    isLoading: isLoadingStaticalData,
    error: staticalError,
  } = useStaticalJobPostSpecific(startDate, endDate, selectedJobPostId);

  const handleMonthChange = (month) => {
    const newStartDate = dayjs()
      .month(month - 1)
      .startOf("month")
      .format("YYYY-MM-DD");
    const newEndDate = dayjs()
      .month(month - 1)
      .endOf("month")
      .format("YYYY-MM-DD");
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Example data for gender stats
  const genderStatsData = [
    { name: "Nam", value: staticalData?.gender_stats?.male || 0 },
    { name: "Nữ", value: staticalData?.gender_stats?.female || 0 },
  ];

  return (
    <div className="flex">
      {/* Danh sách tin tuyển dụng dưới dạng blog */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold">Danh sách tin tuyển dụng</h2>
        {isLoading && <p>Đang tải danh sách tin tuyển dụng...</p>}
        {error && (
          <p>Đã xảy ra lỗi khi tải danh sách tin tuyển dụng: {error.message}</p>
        )}
        <div>
          {recruitments && recruitments.length > 0 ? (
            recruitments.map((recruitment) => (
              <div
                key={recruitment.id}
                className="p-4 border border-gray-300 mb-4 cursor-pointer"
                onClick={() => setSelectedJobPostId(recruitment.id)}
              >
                <h3 className="text-lg font-semibold">{recruitment.content}</h3>
                <p>
                  Ngày đăng:{" "}
                  {dayjs(recruitment.created_date).format("DD/MM/YYYY")}
                </p>
                <p>Mức lương: {recruitment.salary}</p>
                <p>Kinh nghiệm: {recruitment.experience}</p>
                <p>Số lượng: {recruitment.quantity}</p>
              </div>
            ))
          ) : (
            <p>Không có tin tuyển dụng</p>
          )}
        </div>
      </div>

      {/* Biểu đồ phân tích dữ liệu */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold">Biểu đồ phân tích</h2>

        {/* Dropdown chọn tháng */}
        <div className="mb-4">
          <select
            onChange={(e) => handleMonthChange(e.target.value)}
            defaultValue={currentMonth}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </select>
        </div>

        {/* Hiển thị biểu đồ chỉ khi có dữ liệu và không có lỗi */}
        {selectedJobPostId && !isLoadingStaticalData && !staticalError && (
          <div>
            {/* Biểu đồ số lượng ứng viên */}
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={staticalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total_applications"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="pending_applications"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="approved_applications"
                  stroke="#ffc658"
                />
                <Line
                  type="monotone"
                  dataKey="rejected_applications"
                  stroke="#ff7300"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Biểu đồ thống kê giới tính */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderStatsData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {genderStatsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#8884d8" : "#82ca9d"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Hiển thị tuổi trung bình */}
            {staticalData?.average_age !== null && (
              <div className="mt-4">
                <p className="text-lg font-semibold">
                  Tuổi trung bình: {staticalData.average_age} tuổi
                </p>
              </div>
            )}
          </div>
        )}

        {/* Thông báo khi đang tải hoặc gặp lỗi */}
        {isLoadingStaticalData && <p>Đang tải dữ liệu thống kê...</p>}
        {staticalError && <p>Đã xảy ra lỗi khi lấy dữ liệu thống kê.</p>}
      </div>
    </div>
  );
};

export default StatucalJobPostSpecificChart;
