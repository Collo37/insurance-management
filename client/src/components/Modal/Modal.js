import React, { useContext, useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import OwnersContext from "../../context/ownersContext";
import VehiclesContext from "../../context/vehiclesContext";

import styles from "./styles.module.css";
import { axiosInstance } from "../../axios";

const OwnerVariant = ({ owner, setOwner }) => {
  return (
    <Box
      width="100%"
      height="fit-content"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography fontFamily="Poppins">Add Owner</Typography>
      <TextField
        type="text"
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
        onChange={(event) =>
          setOwner({
            ...owner,
            name: event.target.value.toLowerCase(),
          })
        }
        label="Full Name"
      />
      <TextField
        type="text"
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
        onChange={(event) =>
          setOwner({
            ...owner,
            phone: event.target.value.toLowerCase(),
          })
        }
        label="Phone"
      />
      <TextField
        type="text"
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
        onChange={(event) =>
          setOwner({
            ...owner,
            email: event.target.value.toLowerCase(),
          })
        }
        label="Email"
      />
    </Box>
  );
};

const VehicleVariant = ({ owners, getOwners, setVehicle, vehicle }) => {
  useEffect(() => {
    owners.length === 0 && getOwners();
  }, []);

  return (
    <Box
      width="100%"
      height="fit-content"
      gap="10px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography fontFamily="Poppins">Add Vehicle</Typography>
      <TextField
        type="text"
        label="Registration Number"
        onChange={(event) =>
          setVehicle({
            ...vehicle,
            registrationNumber: event.target.value.toUpperCase(),
          })
        }
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
      />
      <TextField
        type="text"
        label="Vehicle Type"
        onChange={(event) =>
          setVehicle({ ...vehicle, vehicleType: event.target.value })
        }
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
      />
      <TextField
        type="date"
        InputLabelProps={{ shrink: true }}
        sx={{
          marginBottom: "10px",
          width: "100%",
          maxWidth: "225px",
          "& .Mui-focused": {
            color: "var(--primary) !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--primary) !important",
          },
        }}
        label="Insurance Expiry"
        onChange={(event) => {
          const expiryDate = new Date(event.target.value).toJSON();
          setVehicle({ ...vehicle, expiryDate });
        }}
      />
      <Typography fontFamily="Poppins">Select Owner</Typography>
      <select
        className={styles.select}
        label="Select Owner"
        onChange={(event) =>
          setVehicle({ ...vehicle, ownerId: event.target.value })
        }
      >
        {owners.map((owner, index) => {
          return (
            <option
              className={styles.select_option}
              key={index}
              value={owner._id}
            >
              {owner.name}
            </option>
          );
        })}
      </select>
    </Box>
  );
};

const Modal = ({ variant, setModalVariant }) => {
  const [vehicle, setVehicle] = useState({});
  const [owner, setOwner] = useState({});

  const { owners, getOwners } = useContext(OwnersContext);

  const handleAddVehicle = async () => {
    if (
      !vehicle.registrationNumber ||
      !vehicle.expiryDate ||
      !vehicle.vehicleType
    ) {
      alert("Fill all the necessary fields");
    } else {
      const res = await axiosInstance.post(
        "/vehicles",
        {
          ...vehicle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.status !== 201 || !res) {
        alert("Something went wrong. Try again");
      } else {
        alert("Vehicle Added Successfully");
        window.location.reload();
      }
      setModalVariant(null);
    }
  };
  const handleAddOwner = async () => {
    if (!owner.name || !owner.email || !owner.phone) {
      alert("Fill all the necessary fields");
    } else {
      const res = await axiosInstance.post(
        "/owners",
        {
          ...owner,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.status !== 201) {
        alert("Something went wrong. Try again");
      } else {
        alert("Owner Added Successfully");
        getOwners();
      }
      setModalVariant(null);
    }
  };

  return (
    <Box
      backgroundColor="rgba(0, 0, 0, 0.5)"
      position="fixed"
      width="100vw"
      height="100%"
      top="0"
      left="0"
      zIndex="500"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        maxWidth="330px"
        height="fit-content"
        backgroundColor="#fff"
        borderRadius="15px"
        padding="40px 20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {variant === "owner" ? (
          <OwnerVariant owner={owner} setOwner={setOwner} />
        ) : (
          <VehicleVariant
            vehicle={vehicle}
            setVehicle={setVehicle}
            owners={owners}
            getOwners={getOwners}
          />
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="10px"
          marginTop="10px"
          sx={{ width: "100%", maxWidth: "225px" }}
        >
          <Button
            sx={{
              width: "100px",
              height: "56px",
              color: "var(--warning)",
              borderColor: "var(--warning)",
            }}
            variant="outlined"
            onClick={() => setModalVariant(null)}
          >
            Close
          </Button>
          <Button
            sx={{
              width: "100px",
              height: "56px",
              color: "var(--primary)",
              borderColor: "var(--primary)",
            }}
            variant="outlined"
            onClick={variant === "owner" ? handleAddOwner : handleAddVehicle}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Modal;
