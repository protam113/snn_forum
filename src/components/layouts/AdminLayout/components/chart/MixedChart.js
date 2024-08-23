import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import useBlog from "../../../../../hooks/useBlog";
import useProduct from "../../../../../hooks/useProduct";
import useRecruitment from "../../../../../hooks/useRecruitment";

export default function MixChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ["Blogs", "Products", "Recruitments"],
    data: [0, 0, 0],
  });

  const { blogs } = useBlog(); // Get blogs data
  const { products } = useProduct(); // Get products data
  const { recruitments } = useRecruitment(); // Get recruitments data

  useEffect(() => {
    const blogsCount = blogs.length;
    const productsCount = products.length;
    const recruitmentsCount = recruitments.length;

    setChartData({
      labels: ["Blogs", "Products", "Recruitments"],
      data: [blogsCount, productsCount, recruitmentsCount],
    });
  }, [blogs, products, recruitments]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartRefContext = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(chartRefContext, {
      type: "pie",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Counts",
            data: chartData.data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
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
      <canvas ref={chartRef} style={{ width: "300px", height: "200px" }} />
    </div>
  );
}
