import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import { useStaticalBlogGeneral } from "../../../../../../hooks/Statistical/StaticalBlogGeneral";

export default function StaticalBlogGeneral() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("01"); // Default to January
  const [months] = useState([
    { value: "01", label: "Tháng 1" },
    { value: "02", label: "Tháng 2" },
    { value: "03", label: "Tháng 3" },
    { value: "04", label: "Tháng 4" },
    { value: "05", label: "Tháng 5" },
    { value: "06", label: "Tháng 6" },
    { value: "07", label: "Tháng 7" },
    { value: "08", label: "Tháng 8" },
    { value: "09", label: "Tháng 9" },
    { value: "10", label: "Tháng 10" },
    { value: "11", label: "Tháng 11" },
    { value: "12", label: "Tháng 12" },
  ]);

  // Sử dụng hook với các tham số startDate và endDate
  const startDate = `2024-${selectedMonth}-01`;
  const lastDay = new Date(2024, parseInt(selectedMonth), 0).getDate();
  const endDate = `2024-${selectedMonth}-${lastDay}`;

  const {
    data: staticalBlogGeneral,
    isLoading,
    error,
  } = useStaticalBlogGeneral(startDate, endDate);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (!isLoading && !error && staticalBlogGeneral) {
      // Dữ liệu cho biểu đồ
      const labels = [
        "Tổng Số Lượt Thích",
        "Tổng Số Bình Luận",
        "Tổng Số Tương Tác",
      ];
      const totalData = [
        staticalBlogGeneral.total_likes || 0,
        staticalBlogGeneral.total_comments || 0,
        staticalBlogGeneral.total_interactions || 0,
      ];

      const averageData = [
        staticalBlogGeneral.average_likes_per_blog || 0,
        staticalBlogGeneral.average_comments_per_blog || 0,
        staticalBlogGeneral.average_interactions_per_blog || 0,
      ];

      setChartData({
        labels,
        datasets: [
          {
            type: "bar",
            label: "Tổng Số Lượng",
            data: totalData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Trung Bình Mỗi Bài Viết",
            data: averageData,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
          },
        ],
      });

      setTotalBlogs(staticalBlogGeneral.total_blogs || 0);
    } else if (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    }
  }, [staticalBlogGeneral, isLoading, error]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
            datalabels: {
              display: true,
              formatter: (value, context) => {
                return context.dataIndex === 0 ? `${totalBlogs}` : "";
              },
              color: "black",
              font: {
                weight: "bold",
                size: 16,
              },
              align: "center",
              anchor: "center",
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: false,
            },
          },
        },
      });
    } else {
      console.error("Canvas context is not available");
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, totalBlogs]);

  return (
    <div>
      <select
        onChange={handleMonthChange}
        value={selectedMonth}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <canvas
        ref={chartRef}
        className="w-[400px] h-[300px] border border-gray-200 rounded-md shadow-lg"
      />
    </div>
  );
}
