import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useStaticalProductGeneral } from "../../../../../../hooks/Statistical/StaticalProductGeneral";

const formatPrice = (price) => {
  if (!price) return "0 đ";
  const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
  return `${formattedPrice} đ`;
};

export default function StaticalProductGeneral() {
  const [barChartData, setBarChartData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [frequency, setFrequency] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("MM"));
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.ceil(dayjs().month() / 3)
  );
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [startDate, setStartDate] = useState(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: `Tháng ${i + 1}`,
  }));

  const quarters = [1, 2, 3, 4].map((q) => ({
    value: q,
    label: `Quý ${q}`,
  }));

  const getQuarterDates = (quarter, year) => {
    switch (quarter) {
      case 1:
        return {
          start: dayjs(`${year}-01-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-03-31`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 2:
        return {
          start: dayjs(`${year}-04-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-06-30`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 3:
        return {
          start: dayjs(`${year}-07-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-09-30`).endOf("quarter").format("YYYY-MM-DD"),
        };
      case 4:
        return {
          start: dayjs(`${year}-10-01`).startOf("quarter").format("YYYY-MM-DD"),
          end: dayjs(`${year}-12-31`).endOf("quarter").format("YYYY-MM-DD"),
        };
      default:
        return {
          start: dayjs().startOf("year").format("YYYY-MM-DD"),
          end: dayjs().endOf("year").format("YYYY-MM-DD"),
        };
    }
  };

  useEffect(() => {
    if (frequency === "day") {
      setStartDate(dayjs().startOf("day").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("day").format("YYYY-MM-DD"));
    } else if (frequency === "month") {
      setStartDate(dayjs().startOf("month").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("month").format("YYYY-MM-DD"));
    } else if (frequency === "quarter") {
      const { start, end } = getQuarterDates(selectedQuarter, selectedYear);
      setStartDate(start);
      setEndDate(end);
    } else if (frequency === "year") {
      setStartDate(dayjs().startOf("year").format("YYYY-MM-DD"));
      setEndDate(dayjs().endOf("year").format("YYYY-MM-DD"));
    }
  }, [frequency, selectedMonth, selectedQuarter, selectedYear]);

  const {
    data: staticalProductGeneral,
    isLoading,
    error,
  } = useStaticalProductGeneral(startDate, endDate, frequency);

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const startOfMonth = dayjs(`2024-${event.target.value}-01`)
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = dayjs(`2024-${event.target.value}-01`)
      .endOf("month")
      .format("YYYY-MM-DD");
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(Number(event.target.value));
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  useEffect(() => {
    if (!isLoading && !error && staticalProductGeneral) {
      // Tạo dữ liệu cho biểu đồ cột
      const barChartData = [
        {
          name: "Sản phẩm tồn kho",
          count: staticalProductGeneral.in_stock_products,
        },
        {
          name: "Sản phẩm hết hàng",
          count: staticalProductGeneral.out_of_stock_products,
        },
        {
          name: "Sản phẩm mới",
          count: staticalProductGeneral.new_products,
        },
        {
          name: "Sản phẩm đã sử dụng",
          count: staticalProductGeneral.used_products,
        },
      ];

      setBarChartData(barChartData);
      setTotalProducts(staticalProductGeneral.total_products);
      setTotalPrice(staticalProductGeneral.total_price);
    } else if (error) {
      toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
    }
  }, [staticalProductGeneral, isLoading, error]);

  return (
    <div>
      <select
        id="frequency"
        value={frequency}
        onChange={handleFrequencyChange}
        className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="day">Ngày</option>
        <option value="month">Tháng</option>
        <option value="quarter">Quý</option>
        <option value="year">Năm</option>
      </select>

      {frequency === "month" && (
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      )}

      {frequency === "quarter" && (
        <select
          id="quarter"
          value={selectedQuarter}
          onChange={handleQuarterChange}
          className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {quarters.map((quarter) => (
            <option key={quarter.value} value={quarter.value}>
              {quarter.label}
            </option>
          ))}
        </select>
      )}

      {frequency === "year" && (
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="mb-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: 10 }, (_, i) => ({
            value: dayjs().year() - i,
            label: dayjs().year() - i,
          })).map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      )}

      <div className="w-full h-80">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Biểu Đồ Cột Các Loại Sản Phẩm
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <hr className="mt-8" />
      {/* Summary */}
      <div className="space-y-2">
        <div className="text-lg font-semibold text-gray-800">
          <strong>Tổng số sản phẩm:</strong> {totalProducts || "N/A"}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          <strong>Tổng giá trị:</strong> {formatPrice(totalPrice)}
        </div>
      </div>
    </div>
  );
}
