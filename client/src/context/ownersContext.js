import { createContext, useState } from "react";

import { axiosInstance } from "../axios";

const OwnersContext = createContext();

export const OwnersProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);

  const getOwners = async () => {
    const res = await axiosInstance.get("/owners", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    setOwners(res?.data.data);
  };
  return (
    <OwnersContext.Provider value={{ owners, getOwners }}>
      {children}
    </OwnersContext.Provider>
  );
};

export default OwnersContext;
