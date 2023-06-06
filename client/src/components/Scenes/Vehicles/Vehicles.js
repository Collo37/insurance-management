import { useEffect, useContext, useState } from "react";
import VehiclesContext from "../../../context/vehiclesContext";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Heading from "../../Heading/Heading";
import CustomToolbar from "../../CustomToolbar/CustomToolbar";

const Vehicles = () => {
  const {
    vehicles,
    unfilteredVehicles,
    getVehicles,
    setVehicles,
    filterOn,
    setFilterOn,
  } = useContext(VehiclesContext);
  const [regNumber, setRegNumber] = useState("");
  useEffect(() => {
    vehicles.length === 0 && getVehicles();
    if (filterOn) {
      setVehicles(unfilteredVehicles);
      setFilterOn(false);
    }
  }, []);

  const filter = (key) => {
    const filteredVehicles = unfilteredVehicles.filter((vehicle) => {
      return vehicle.registrationNumber.includes(key.toUpperCase());
    });
    setVehicles(filteredVehicles);
    setFilterOn(true);
  };

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
      minWidth: 150,
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
    <Box m="1.5rem 2.5rem">
      <Heading
        title="Vehicles"
        subtitle={`View all registered vehicles (${vehicles.length || 0})`}
      />
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={vehicles.length === 0 ? true : false}
          getRowId={(row) => row._id}
          rows={
            vehicles.map((vehicle) => {
              return {
                ...vehicle,
                expiryDate: new Date(vehicle?.expiryDate).toDateString(),
                ownerName: vehicle?.ownerId?.name,
                ownerPhone: vehicle?.ownerId?.phone,
                ownerEmail: vehicle?.ownerId?.email,
                placeholder: "Search Vehicles...",
              };
            }) || []
          }
          columns={columns}
          components={{ Toolbar: CustomToolbar }}
          componentsProps={{
            toolbar: {
              searchInput: regNumber,
              setSearchInput: setRegNumber,
              setSearch: filter,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Vehicles;
