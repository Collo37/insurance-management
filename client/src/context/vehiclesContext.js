import { createContext, useState } from "react";
import { axiosInstance } from "../axios";

const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [unfilteredVehicles, setUnfilteredVehicles] = useState([]);
  const [filterOn, setFilterOn] = useState(false);

  const getVehicles = async () => {
    const res = await axiosInstance.get("/vehicles", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setVehicles(res?.data.data);
    setUnfilteredVehicles(res?.data.data);
    setFilterOn(false);
  };

  const updateVehicle = async (id, details) => {
    const res = await axiosInstance.post(
      `/vehicles/edit/${id}`,
      {
        ...details,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    getVehicles();
    return res.status;
  };

  // getVehicles();

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        unfilteredVehicles,
        getVehicles,
        setVehicles,
        filterOn,
        setFilterOn,
        updateVehicle,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

export default VehiclesContext;
