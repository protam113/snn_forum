// src/components/SomeComponent.js
import React, { useContext, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const SomeComponent = () => {
  const { getToken } = useContext(useAuth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/protected-endpoint", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getToken]);

  return <div>Some Component Content</div>;
};

export default SomeComponent;
