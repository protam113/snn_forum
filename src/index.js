import React from "react";
import { createRoot } from "react-dom/client"; // Tạo root cho ứng dụng React
import App from "./App"; // Import component chính của ứng dụng
import reportWebVitals from "./reportWebVitals"; // Đo hiệu suất của ứng dụng
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Quản lý state với react-query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Công cụ devtools cho react-query

// Khởi tạo queryClient từ thư viện react-query
const queryClient = new QueryClient();

// Hàm đẩy dữ liệu vào dataLayer của Google Tag Manager (hoặc các công cụ phân tích khác)
const sendToDataLayer = (eventData) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

// Hàm logPerformance được gọi bởi reportWebVitals để ghi lại các chỉ số hiệu suất
const logPerformance = (metric) => {
  sendToDataLayer({
    event: "performanceMetric", // Sự kiện theo dõi hiệu suất
    metricName: metric.name, // Tên của chỉ số hiệu suất
    metricValue: metric.value, // Giá trị của chỉ số hiệu suất
    metricLabel: metric.label || "N/A", // Nhãn của chỉ số (nếu có)
  });
};

// Tạo root cho ứng dụng React và render App vào đó
const container = document.getElementById("root");
const root = createRoot(container); // Sử dụng createRoot để khởi tạo root
root.render(
  <React.StrictMode>
    {/* Cung cấp queryClient cho toàn bộ ứng dụng */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* ReactQueryDevtools để hỗ trợ debugging trong môi trường phát triển */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Gọi hàm reportWebVitals để theo dõi hiệu suất ứng dụng và ghi lại các chỉ số
reportWebVitals(logPerformance);
