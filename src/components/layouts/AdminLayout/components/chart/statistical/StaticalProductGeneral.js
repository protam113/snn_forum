import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useStatical from "../../../../../../hooks/useStatical";
import { toast } from "react-toastify";

export default function StaticalProductGeneral() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalProducts, setTotalProducts] = useState(null);
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

  const {
    staticalProductGeneral,
    loading,
    error,
    fetchStaticalProductGeneral,
  } = useStatical();

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const startDate = `2024-${selectedMonth}-01`;
    const lastDay = new Date(2024, parseInt(selectedMonth), 0).getDate();
    const endDate = `2024-${selectedMonth}-${lastDay}`;

    fetchStaticalProductGeneral(startDate, endDate);
  }, [fetchStaticalProductGeneral, selectedMonth]);

  useEffect(() => {
    if (!loading && !error && staticalProductGeneral) {
      // Dữ liệu cho biểu đồ
      const labels = [
        "Tổng Số Sản Phẩm",
        "Tổng Giá",
        "Sản Phẩm Còn Hàng",
        "Sản Phẩm Hết Hàng",
        "Sản Phẩm Mới",
        "Sản Phẩm Đã Qua Sử Dụng",
      ];
      const data = [
        staticalProductGeneral.total_products || 0,
        staticalProductGeneral.total_price || 0,
        staticalProductGeneral.in_stock_products || 0,
        staticalProductGeneral.out_of_stock_products || 0,
        staticalProductGeneral.new_products || 0,
        staticalProductGeneral.used_products || 0,
      ];

      setChartData({
        labels,
        datasets: [
          {
            label: "Số Liệu Sản Phẩm",
            data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1,
          },
        ],
      });

      setTotalProducts(staticalProductGeneral.total_products || 0);
    } else if (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    }
  }, [staticalProductGeneral, loading, error]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "polarArea",
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
      <canvas
        ref={chartRef}
        className="w-[400px] h-[300px] border border-gray-200 rounded-md shadow-lg"
      />
    </div>
  );
}
