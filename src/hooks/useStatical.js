import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useStatical = () => {
  const [staticalUser, setStaticalUser] = useState(null);
  const [staticalProductCategoryGeneral, setStaticalProductCategoryGeneral] =
    useState(null);
  const [staticalBlogGeneral, setStaticalBlogGeneral] = useState(null);
  const [staticalProductGeneral, setStaticalProductGeneral] = useState(null);
  const [staticalProductCategorySpecific, setStaticalProductCategorySpecific] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  // Fetch user statistics
  const fetchStaticalUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("Không có token");
      }
      const response = await authApi(token).get(endpoints.StaticalUser);
      setStaticalUser(response.data);
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy thống kê người dùng");
      toast.error("Đã xảy ra lỗi khi lấy thống kê người dùng");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  // Fetch general product category statistics
  const fetchStaticalProductCategoryGeneral = useCallback(
    async (startDate, endDate) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Không có token");
        }

        // Kiểm tra và đảm bảo startDate và endDate không bị undefined
        if (!startDate || !endDate) {
          throw new Error("Start date hoặc end date không hợp lệ");
        }

        const response = await authApi(token).get(
          `${
            endpoints.StaticalProductCategoryGeneral
          }?start_date=${encodeURIComponent(
            startDate
          )}&end_date=${encodeURIComponent(endDate)}`
        );
        setStaticalProductCategoryGeneral(response.data);
      } catch (err) {
        console.error(err); // Ghi log lỗi để dễ dàng theo dõi
        setError("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Fetch blog statistics
  const fetchStaticalBlogGeneral = useCallback(
    async (startDate, endDate) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Không có token");
        }

        // Kiểm tra và đảm bảo startDate và endDate không bị undefined
        if (!startDate || !endDate) {
          throw new Error("Start date hoặc end date không hợp lệ");
        }

        const response = await authApi(token).get(
          `${endpoints.StaticalBlogGeneral}?start_date=${encodeURIComponent(
            startDate
          )}&end_date=${encodeURIComponent(endDate)}`
        );
        setStaticalBlogGeneral(response.data);
      } catch (err) {
        console.error(err); // Ghi log lỗi để dễ dàng theo dõi
        setError("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Fetch general product statistics
  const fetchStaticalProductGeneral = useCallback(
    async (startDate, endDate) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Không có token");
        }

        // Kiểm tra và đảm bảo startDate và endDate không bị undefined
        if (!startDate || !endDate) {
          throw new Error("Start date hoặc end date không hợp lệ");
        }

        const response = await authApi(token).get(
          `${endpoints.StaticalProductGeneral}?start_date=${encodeURIComponent(
            startDate
          )}&end_date=${encodeURIComponent(endDate)}`
        );
        setStaticalProductGeneral(response.data);
      } catch (err) {
        console.error(err); // Ghi log lỗi để dễ dàng theo dõi
        setError("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  // Fetch specific product category statistics
  const fetchStaticalProductCategorySpecific = useCallback(
    async (startDate, endDate, categoryId) => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) {
          throw new Error("Không có token");
        }

        if (!startDate || !endDate || !categoryId) {
          throw new Error("Thông tin không đầy đủ");
        }

        const response = await authApi(token).get(
          `${
            endpoints.StaticalProductCategorySpecific
          }?start_date=${encodeURIComponent(
            startDate
          )}&end_date=${encodeURIComponent(
            endDate
          )}&category_id=${encodeURIComponent(categoryId)}`
        );

        // Kiểm tra dữ liệu phản hồi
        if (response && response.data && typeof response.data === "object") {
          return response.data;
        } else {
          console.error(
            `Dữ liệu phản hồi không hợp lệ cho danh mục ${categoryId}`
          );
          return { total_products: 0, total_price: 0.0 }; // Hoặc giá trị mặc định khác
        }
      } catch (err) {
        console.error(err);
        setError("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu thống kê");
        return { total_products: 0, total_price: 0.0 }; // Hoặc giá trị mặc định khác
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  useEffect(() => {}, [
    fetchStaticalUser,
    fetchStaticalProductCategoryGeneral,
    fetchStaticalBlogGeneral,
    fetchStaticalProductGeneral,
    fetchStaticalProductCategorySpecific,
  ]);

  return {
    staticalUser,
    staticalProductCategoryGeneral,
    staticalBlogGeneral,
    staticalProductGeneral,
    staticalProductCategorySpecific,
    loading,
    error,
    fetchStaticalUser,
    fetchStaticalProductCategoryGeneral,
    fetchStaticalBlogGeneral,
    fetchStaticalProductGeneral,
    fetchStaticalProductCategorySpecific,
  };
};

export default useStatical;
