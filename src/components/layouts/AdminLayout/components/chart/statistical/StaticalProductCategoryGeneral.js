import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { toast } from "react-toastify";
import { useStaticalProductCategoryGeneral } from "../../../../../../hooks/Statistical/StaticalProductCategoryGeneral";
import Loading from "../../../../../../pages/error/load";

export default function StaticalProductCategoryGeneral() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedMonth, setSelectedMonth] = useState("01"); // Default to January

  const months = [
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
  ];

  const {
    data: staticalProductCategoryGeneral,
    isLoading,
    error,
  } = useStaticalProductCategoryGeneral(
    `2024-${selectedMonth}-01`,
    `2024-${selectedMonth}-${new Date(
      2024,
      parseInt(selectedMonth),
      0
    ).getDate()}`
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    if (!isLoading && !error && staticalProductCategoryGeneral) {
      // Data for chart
      const labels = staticalProductCategoryGeneral.map((item) => item.name);
      const data = staticalProductCategoryGeneral.map(
        (item) => item.total_products || 0
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Số Lượng Sản Phẩm Theo Thể Loại",
            data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } else if (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    }
  }, [staticalProductCategoryGeneral, isLoading, error]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
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
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
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
  }, [chartData]);

  return (
    <div className="flex flex-col items-center p-4">
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
      {isLoading ? (
        <p>
          <Loading />
        </p>
      ) : (
        <canvas
          ref={chartRef}
          className="w-[400px] h-[300px] border border-gray-200 rounded-md shadow-lg"
        />
      )}
    </div>
  );
}
