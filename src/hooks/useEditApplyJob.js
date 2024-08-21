import { useState, useCallback } from "react";
import { authApi, endpoints } from "../api/api";
import useAuth from "./useAuth";

const useEditApplyJob = (postId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  // Function to edit the application
  const editApplyJob = useCallback(
    async (applicationId, updatedData) => {
      if (!applicationId || !updatedData) return;

      setLoading(true);
      setError(null);

      try {
        const token = await getToken();
        if (!token) throw new Error("No token available");

        const url = endpoints.EditApplyJob.replace(":id", applicationId);

        // Update the application status
        const response = await authApi(token).patch(url, updatedData);

        return response.data; // Return updated data from the API if needed
      } catch (error) {
        console.error("Error editing application:", error);
        setError(error.response?.data?.detail || "Error editing application");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [getToken]
  );

  return {
    loading,
    error,
    editApplyJob,
  };
};

export default useEditApplyJob;
