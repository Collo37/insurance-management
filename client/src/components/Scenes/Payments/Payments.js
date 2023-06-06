import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import PaymentsContext from "../../../context/paymentsContext";

import Heading from "../../Heading/Heading";
import CustomToolbar from "../../CustomToolbar/CustomToolbar";

const Payments = () => {
  const { payments, getPayments, setSearch, total } =
    useContext(PaymentsContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (payments.length === 0) {
      getPayments();
    }
  }, []);

  const columns = [
    {
      field: "registrationNumber",
      headerName: "Vehicle",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "paymentMode",
      headerName: "Payment Mode",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "transactionCode",
      headerName: "Transaction Code",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "transactionDate",
      headerName: "Transaction Date",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 150,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Heading title="Payments" subtitle="List of recorded transactions" />
      <Box height="500px" mt="40px">
        <DataGrid
          columns={columns}
          rows={(payments && payments) || []}
          loading={payments.length === 0 ? true : false}
          getRowId={(row) => row._id}
          rowCount={(payments && total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          pageSize={20}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            toolbar: { setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Payments;
