import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useStatical from "../../../../../hooks/useStatical";

export default function UserChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [totalUsers, setTotalUsers] = useState(null);

  const { staticalUser, loading, error, fetchStaticalUser } = useStatical();

  useEffect(() => {
    // Fetch data when component mounts
    fetchStaticalUser();
  }, [fetchStaticalUser]);

  useEffect(() => {
    if (!loading && !error && staticalUser) {
      // Data for chart
      const labels = ["Admin", "Manager", "User"];

      const data = [
        staticalUser.admin_count,
        staticalUser.manager_count,
        staticalUser.no_group_count,
      ];

      setChartData({
        labels,
        data,
      });

      // Set total users for displaying on the chart
      setTotalUsers(staticalUser.total_users);
    }
  }, [staticalUser, loading, error]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "User Distribution",
            data: chartData.data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(75, 192, 192)",
            ],
          },
        ],
      },
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
          // Display total number on the chart
          datalabels: {
            display: true,
            formatter: (value, context) => {
              return context.dataIndex === 0 ? `${totalUsers}` : "";
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
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, totalUsers]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "200px", height: "200px" }} />
    </div>
  );
}
