import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useAdmin from "../../../../../hooks/useAdmin";

export default function UserChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  const { users, loadingUsers, error } = useAdmin();

  useEffect(() => {
    if (!loadingUsers && !error) {
      const groupCounts = users.reduce((acc, user) => {
        if (Array.isArray(user.groups)) {
          user.groups.forEach((group) => {
            acc[group.name] = (acc[group.name] || 0) + 1;
          });
        }
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(groupCounts),
        data: Object.values(groupCounts),
      });
    }
  }, [users, loadingUsers, error]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const UserChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(UserChartRef, {
      type: "doughnut",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "User Count by Group",
            data: chartData.data,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
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
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "200px", height: "200px" }} />
    </div>
  );
}
