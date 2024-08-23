import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useUserSearch from "../../../../../hooks/useUserSearch";
import useCategories from "../../../../../hooks/useCategories";
import useUserBanner from "../../../../../hooks/useUserbanner";

export default function PolarAreaChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { results: featuredUsers, fetchUsers } = useUserSearch(); // Get all users
  const { categories } = useCategories(); // Get all categories
  const { userBanner } = useUserBanner(); // Get all banners

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    // Prepare data for polar area chart
    const data = {
      labels: ["Users", "Categories", "Banners"],
      datasets: [
        {
          label: "Distribution", // Dataset label
          data: [featuredUsers.length, categories.length, userBanner.length],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)", // Color for Users
            "rgba(54, 162, 235, 0.6)", // Color for Categories
            "rgba(255, 99, 132, 0.6)", // Color for Banners
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartCtx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(chartCtx, {
      type: "polarArea", // Chart type
      data,
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [featuredUsers, categories, userBanner]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "400px", height: "400px" }} />
    </div>
  );
}
