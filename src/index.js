import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const sendToDataLayer = (eventData) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);
};

const logPerformance = (metric) => {
  sendToDataLayer({
    event: "performanceMetric",
    metricName: metric.name,
    metricValue: metric.value,
    metricLabel: metric.label || "N/A",
  });
};

// Render ứng dụng React
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

// Gọi reportWebVitals với hàm logPerformance
reportWebVitals(logPerformance);
