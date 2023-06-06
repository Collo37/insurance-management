import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import VehiclesContext from "../../../context/vehiclesContext";
import OwnersContext from "../../../context/ownersContext";

import Heading from "../../Heading/Heading";
import VehicleCard from "../../VehicleCard/VehicleCard";

import { Search } from "@mui/icons-material";
import { axiosInstance } from "../../../axios";

const Manage = () => {
  const isDesktop = useMediaQuery("(min-width: 600px)");
  const {
    vehicles,
    unfilteredVehicles,
    getVehicles,
    setVehicles,
    filterOn,
    setFilterOn,
  } = useContext(VehiclesContext);

  const { getOwners } = useContext(OwnersContext);

  const [regNumber, setRegNumber] = useState("");

  const filter = (key) => {
    const filteredVehicles = unfilteredVehicles.filter((vehicle) => {
      return vehicle.registrationNumber.includes(key.toUpperCase());
    });
    setVehicles(filteredVehicles);
    setFilterOn(true);
  };

  const handleDelete = async (vehicleId) => {
    try {
      await axiosInstance.delete(`/vehicles/delete/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      alert("Deleted successfully");
      getVehicles();
      getOwners();
    } catch (error) {
      alert("An error occured. Try again");
    }
  };

  useEffect(() => {
    vehicles.length === 0 && getVehicles();
    if (filterOn) {
      setVehicles(unfilteredVehicles);
      setFilterOn(false);
    }
  }, []);

  return (
    <Box width="100%" height="fit-content" padding="20px">
      <Heading
        title="Manage Vehicles"
        subtitle="Add, update or remove vehicles"
      />
      <Box width="100%" height="100px" margin="30px 0">
        <Typography fontFamily="Poppins" sx={{ marginBottom: "15px" }}>
          Search for a vehicle
        </Typography>
        <Box width="100%" height="50px" display="flex">
          <TextField
            label="Registration Number..."
            type="text"
            onChange={(event) => {
              setRegNumber(event.target.value);
              filter(event.target.value);
            }}
            sx={{
              height: "100%",
              "& .Mui-focused": {
                color: "var(--primary) !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary) !important",
              },
            }}
          />
          <IconButton
            sx={{ width: "50px", height: "50px", color: "var(--primary)" }}
            onClick={() => filter(regNumber)}
          >
            <Search />
          </IconButton>
        </Box>
      </Box>
      <Box
        width="fit-content"
        gap="15px"
        height="fit-content"
        display="flex"
        flexWrap="wrap"
        // justifyContent="center"
        sx={{
          justifyContent: isDesktop ? "flex-start" : "center",
        }}
      >
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => {
            return (
              <VehicleCard
                vehicle={vehicle}
                key={index}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Manage;
