import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStaticalBlogGeneral } from "../../../../../../hooks/Statistical/StaticalBlogGeneral";
import dayjs from "dayjs";

export default function StaticalBlogGeneral() {
  const [chartData, setChartData] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [frequency, setFrequency] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MM"));
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.ceil(dayjs().month() / 3)
  ); // Default to current quarter
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
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

  const quarters = [1, 2, 3, 4].map((q) => ({
    value: q,
    label: `Quý ${q}`,
  }));

  const getQuarterDates = (quarter, year) => {
    switch (quarter) {
      case 1:
        return {
          start: dayjs(`${year}-01-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-03-31`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 2:
        return {
          start: dayjs(`${year}-04-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-06-30`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 3:
        return {
          start: dayjs(`${year}-07-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-09-30`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 4:
        return {
          start: dayjs(`${year}-10-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-12-31`).endOf("quarter").format("YYYY-MM-DD"),
        };
      default:
        return {
          start: dayjs().startOf("year").format("YYYY-MM-DD"),
          end: dayjs().endOf("year").format("YYYY-MM-DD"),
        };
    }
  };

  useEffect(() => {
    if (frequency === "day") {
      setStartDate(dayjs().startOf("day").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("day").format("YYYY-MM-DD"));
    } else if (frequency === "month") {
      setStartDate(dayjs().startOf("month").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("month").format("YYYY-MM-DD"));
    } else if (frequency === "quarter") {
      const { start, end } = getQuarterDates(selectedQuarter, selectedYear);
      setStartDate(start);
      setEndDate(end);
    } else if (frequency === "year") {
      setStartDate(dayjs().startOf("year").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("year").format("YYYY-MM-DD"));
    }
  }, [frequency, selectedMonth, selectedQuarter, selectedYear]);

  const {
    data: staticalBlogGeneral,
    isLoading,
    error,
  } = useStaticalBlogGeneral(startDate, endDate, frequency);

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const startOfMonth = dayjs(`2024-${event.target.value}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = dayjs(`2024-${event.target.value}-01`)
      .endOf("month")
      .format("YYYY-MM-DD");
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(Number(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  useEffect(() => {
    if (!isLoading && !error && staticalBlogGeneral) {
      const radarData = [
        {
          subject: "Tổng Số Lượt Thích",
          A: staticalBlogGeneral.total_likes || 0,
        },
        {
          subject: "Tổng Số Bình Luận",
          A: staticalBlogGeneral.total_comments || 0,
        },
        {
          subject: "Tổng Số Tương Tác",
          A: staticalBlogGeneral.total_interactions || 0,
        },
        {
          subject: "Trung Bình Lượt Thích/Bài",
          A: staticalBlogGeneral.average_likes_per_blog || 0,
        },
        {
          subject: "Trung Bình Bình Luận/Bài",
          A: staticalBlogGeneral.average_comments_per_blog || 0,
        },
        {
          subject: "Trung Bình Tương Tác/Bài",
          A: staticalBlogGeneral.average_interactions_per_blog || 0,
        },
      ];

      // Tạo dữ liệu cho biểu đồ đường
      const dailyData = staticalBlogGeneral.daily_blog_counts.map((entry) => ({
        date: dayjs(entry.date).format("YYYY-MM-DD"),
        count: entry.count,
      }));

      setChartData(radarData);
      setDailyData(dailyData);
      setTotalBlogs(staticalBlogGeneral.total_blogs || 0);
    } else if (error) {
    }
  }, [staticalBlogGeneral, isLoading, error]);

  return (
    <div>
      <select
        id="frequency"
        value={frequency}
        onChange={handleFrequencyChange}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="day">Ngày</option>
        <option value="month">Tháng</option>
        <option value="quarter">Quý</option>
        <option value="year">Năm</option>
      </select>

      {frequency === "month" && (
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      )}

      {frequency === "quarter" && (
        <div className="mb-4">
          <select
            id="quarter"
            value={selectedQuarter}
            onChange={handleQuarterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {quarters.map((quarter) => (
              <option key={quarter.value} value={quarter.value}>
                {quarter.label}
              </option>
            ))}
          </select>
          <select
            id="year"
            value={selectedYear}
            onChange={handleYearChange}
            className="ml-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 10 }, (_, i) => dayjs().year() - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {frequency === "year" && (
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 10 }, (_, i) => dayjs().year() - i).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>
      )}

      {frequency === "day" && (
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <RadarChart
        cx={300}
        cy={250}
        outerRadius={200}
        width={600}
        height={500}
        data={chartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
        <Radar
          name="Dữ Liệu"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={dailyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
