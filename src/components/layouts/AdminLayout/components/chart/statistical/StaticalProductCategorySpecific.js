import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useStatical from "../../../../../../hooks/useStatical";
import { toast } from "react-toastify";
import { useCategoryList } from "../../../../../../hooks/Product/useCategories";

export default function StaticalProductCategoryGeneral() {
  const { data: categories = [] } = useCategoryList();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-02-01");
  const [years] = useState(["2022", "2023", "2024", "2025"]);

  const { fetchStaticalProductCategorySpecific } = useStatical();

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
      try {
        const categoryPromises = categories.map(async (category) => {
          const data = await fetchStaticalProductCategorySpecific(
            startDate,
            endDate,
            category.id
          );

          if (data && typeof data === "object") {
            return { category: category.name, data };
          } else {
            console.error(
              `Dữ liệu không hợp lệ cho danh mục ${category.id} từ ${startDate} đến ${endDate}`
            );
            return {
              category: category.name,
              data: { total_products: 0, total_price: 0.0 },
            };
          }
        });

        const categoryData = await Promise.all(categoryPromises);

        const labels = categories.map((category) => category.name);
        const data = labels.map((label) => {
          const category = categoryData.find((item) => item.category === label);
          return category ? category.data.total_products : 0;
        });

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
      } catch (err) {
        console.error(err);
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
      }
    };

    fetchAllCategoriesData();
  }, [fetchStaticalProductCategorySpecific, startDate, endDate, categories]);

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
      <div className="mb-4 text-14">
        <label htmlFor="start-date" className="mr-2">
          Ngày bắt đầu:
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="mr-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="end-date" className="mr-2">
          Ngày kết thúc:
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <canvas
        ref={chartRef}
        className="w-[400px] h-[300px] border border-gray-200 rounded-md shadow-lg"
      />
    </div>
  );
}
