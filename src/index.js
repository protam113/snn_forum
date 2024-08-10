import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Hàm gửi dữ liệu đến dataLayer của GTM
const sendToDataLayer = (eventData) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

// Hàm logPerformance cập nhật để gửi dữ liệu đến GTM mà không ghi vào console
const logPerformance = (metric) => {
  sendToDataLayer({
    event: "performanceMetric",
    metricName: metric.name,
    metricValue: metric.value,
    metricLabel: metric.label || "N/A",
  });
};

// Render ứng dụng React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Gọi reportWebVitals với hàm logPerformance
reportWebVitals(logPerformance);
