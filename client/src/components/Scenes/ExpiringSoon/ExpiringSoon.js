import React, { useEffect, useContext, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";

import { axiosInstance } from "../../../axios";
import DashboardContext from "../../../context/dashboardContext";

import Heading from "../../Heading/Heading";
import { DataGrid } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";

const ExpiringSoon = () => {
  const { vehicleStats, getVehicleStats } = useContext(DashboardContext);
  const [customExpiry, setCustomExpiry] = useState([]);
  const [range, setRange] = useState(30);

  const getExpiries = async (daysLeft = 10) => {
    const res = await axiosInstance.get(
      `/vehicles/stats?daysLeft=${daysLeft}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    setCustomExpiry(res.data.stats.expiringSoon);
  };

  useEffect(() => {
    !vehicleStats.pastDue && getVehicleStats();
    getExpiries(range);
  }, []);

  const columns = [
    {
      field: "registrationNumber",
      headerName: "Registration",
      flex: 0.5,
      minWidth: 100,
    },
    {
      field: "vehicleType",
      headerName: "Type",
      flex: 0.5,
      minWidth: 80,
    },
    {
      field: "expiryDate",
      headerName: "Expiry",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "ownerName",
      headerName: "Owner",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "ownerPhone",
      headerName: "Phone",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "ownerEmail",
      headerName: "Email",
      flex: 1,
      minWidth: 170,
    },
  ];

  return (
    <Box width="100%" height="fit-content" padding="10px 20px" gap="20px">
      <Heading
        title="Expiring Soon"
        subtitle="Licenses expiring within 30 days"
      />
      <Box width="100%" height="fit-content">
        <Box width="100%" height="400px" margin="70px 0">
          <Typography
            fontFamily="Poppins"
            variant="h5"
            sx={{ marginBottom: "20px" }}
          >
            {`Past Due (${
              vehicleStats.pastDue ? vehicleStats.pastDue.length : 0
            })`}
          </Typography>
          <DataGrid
            getRowId={(row) => row._id}
            rows={
              vehicleStats.pastDue
                ? vehicleStats.pastDue.map((vehicle) => {
                    return {
                      ...vehicle,
                      expiryDate: new Date(vehicle.expiryDate).toDateString(),
                      ownerName: vehicle.ownerId.name,
                      ownerPhone: vehicle.ownerId.phone,
                      ownerEmail: vehicle.ownerId.email,
                    };
                  })
                : []
            }
            columns={columns}
          />
        </Box>
        <Box width="100%" height="400px" margin="70px 0">
          <Typography
            fontFamily="Poppins"
            variant="h5"
            sx={{ marginBottom: "20px" }}
          >
            {`Expiring within 10 days (${
              vehicleStats.expiringSoon ? vehicleStats.expiringSoon.length : 0
            })`}
          </Typography>
          <DataGrid
            getRowId={(row) => row._id}
            rows={
              vehicleStats.expiringSoon
                ? vehicleStats.expiringSoon.map((vehicle) => {
                    return {
                      ...vehicle,
                      expiryDate: new Date(vehicle.expiryDate).toDateString(),
                      ownerName: vehicle.ownerId.name,
                      ownerPhone: vehicle.ownerId.phone,
                      ownerEmail: vehicle.ownerId.email,
                    };
                  })
                : []
            }
            columns={columns}
          />
        </Box>
        <Box width="100%" height="500px" marginTop="20px">
          <Box
            width="100%"
            minHeight="120px"
            height="fit-content"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="10px"
          >
            <Typography fontFamily="Poppins" variant="h5">
              {`Expiring within ${range} days (${customExpiry.length})`}
            </Typography>
            <Box
              width="200px"
              display="flex"
              alignItems="center"
              marginBottom="20px"
            >
              <TextField
                label="Enter range"
                type="number"
                sx={{
                  width: 150,
                  height: 50,
                  "& .Mui-focused": {
                    color: "var(--primary) !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary) !important",
                  },
                }}
                onChange={(event) => {
                  getExpiries(event.target.value);
                  setRange(event.target.value);
                }}
              />
              <IconButton
                sx={{ width: 50, height: 50 }}
                onClick={() => getExpiries(range)}
              >
                <Search />
              </IconButton>
            </Box>
          </Box>
          <DataGrid
            getRowId={(row) => row._id}
            rows={
              customExpiry.length > 0
                ? customExpiry.map((vehicle) => {
                    return {
                      ...vehicle,
                      expiryDate: new Date(vehicle.expiryDate).toDateString(),
                      ownerName: vehicle.ownerId.name,
                      ownerPhone: vehicle.ownerId.phone,
                      ownerEmail: vehicle.ownerId.email,
                    };
                  })
                : []
            }
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ExpiringSoon;
