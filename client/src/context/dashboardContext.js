import { useState, createContext } from "react";

import { axiosInstance } from "../axios";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [recentPayments, setRecentPayments] = useState([]);
  const [vehicleStats, setVehicleStats] = useState({});

  const getPayments = async () => {
    const res = await axiosInstance.get(`/payments?pageSize=5`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setRecentPayments(res.data.payments);
  };

  const getVehicleStats = async () => {
    const res = await axiosInstance.get("/vehicles/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setVehicleStats(res.data.stats);
  };
  return (
    <DashboardContext.Provider
      value={{ recentPayments, getPayments, vehicleStats, getVehicleStats }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
