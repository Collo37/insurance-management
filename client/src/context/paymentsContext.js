import { createContext, useState } from "react";

import { axiosInstance } from "../axios";

const PaymentsContext = createContext();

export const PaymentsProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [unfilteredPayments, setUnfilteredPayments] = useState([]);
  const [total, setTotal] = useState(0);

  const getPayments = async () => {
    const paymentsRes = await axiosInstance.get("/payments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    const paymentsModified = paymentsRes.data?.payments.map((payment) => {
      return {
        ...payment,
        registrationNumber: payment.vehicleId?.registrationNumber || "Deleted",
        transactionDate: new Date(payment.transactionDate).toDateString(),
      };
    });

    setPayments(paymentsModified);
    setUnfilteredPayments(paymentsModified);
    setTotal(paymentsRes?.data.total);
  };

  const setSearch = (key) => {
    const filteredPayments = [...unfilteredPayments].filter((payment) => {
      if (key === "") return payment;
      return payment.registrationNumber.includes(key.toUpperCase());
    });

    setPayments([...filteredPayments]);
  };
  return (
    <PaymentsContext.Provider
      value={{ payments, getPayments, setSearch, total }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsContext;
