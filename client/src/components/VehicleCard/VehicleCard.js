import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  TextField,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import VehicleContext from "../../context/vehiclesContext";

const VehicleCard = ({ vehicle, handleDelete }) => {
  const isDesktop = useMediaQuery("(min-width: 600px)");

  const { updateVehicle } = useContext(VehicleContext);

  const [expanded, setExpanded] = useState(false);
  const [details, setDetails] = useState({
    registrationNumber: vehicle?.registrationNumber,
    vehicleType: vehicle?.vehicleType,
    expiryDate: vehicle?.expiryDate,
  });

  const handleUpdate = async () => {
    const status = await updateVehicle(vehicle?._id, details);
    setExpanded(false);
    alert(
      status === 201 ? "Vehicle was updated" : "Failed to update. Try again"
    );
  };

  return (
    <Card
      sx={{
        width: isDesktop ? "250px" : "300px",
        height: expanded ? "500px" : "220px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box width="100%" height="200px">
        <Typography
          variant="h4"
          fontSize="20px"
          color="var(--primary)"
          fontFamily="Poppins"
        >
          Reg: {vehicle?.registrationNumber.toUpperCase()}
        </Typography>
        <Typography fontFamily="Poppins">
          Type: {vehicle?.vehicleType}
        </Typography>
        <Typography fontFamily="Poppins">
          Expiry: {new Date(vehicle?.expiryDate).toDateString()}
        </Typography>
        <Typography fontFamily="Poppins">
          Owner: {vehicle?.ownerId?.name}
        </Typography>
        <Typography fontFamily="Poppins">
          Phone: {vehicle?.ownerId?.phone}
        </Typography>
        <Box
          width="100%"
          height="fit-content"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton
            sx={{ width: 40, height: 40, color: "var(--primary)" }}
            onClick={() => setExpanded(!expanded)}
          >
            <Edit />
          </IconButton>
          <IconButton
            sx={{ width: 40, height: 40, color: "var(--warning)" }}
            onClick={() => handleDelete(vehicle?._id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      {expanded && (
        <Box width="100%" height="fit-content" sx={{ marginTop: "10px" }}>
          <Typography fontFamily="Poppins" color="var(--primary)">
            Edit
          </Typography>
          <TextField
            label="Reg No"
            type="text"
            sx={{
              width: "100%",
              marginTop: "10px",
              "& .Mui-focused": {
                color: "var(--primary) !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary) !important",
              },
            }}
            onChange={(event) =>
              setDetails({
                ...details,
                registrationNumber: event.target.value.toUpperCase(),
              })
            }
          />
          <TextField
            label="Type"
            type="text"
            sx={{
              width: "100%",
              marginTop: "10px",
              "& .Mui-focused": {
                color: "var(--primary) !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary) !important",
              },
            }}
            onChange={(event) =>
              setDetails({
                ...details,
                vehicleType: event.target.value,
              })
            }
          />
          <TextField
            label="Expiry"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "100%",
              marginTop: "10px",
              "& .Mui-focused": {
                color: "var(--primary) !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary) !important",
              },
            }}
            onChange={(event) =>
              setDetails({
                ...details,
                expiryDate: new Date(event.target.value).toJSON(),
              })
            }
          />
          <Button
            variant="outlined"
            height="40px"
            sx={{
              marginTop: "10px",
              color: "var(--primary)",
              borderColor: "var(--primary)",
            }}
            type="submit"
            onClick={() => handleUpdate(vehicle._id)}
          >
            Edit
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default VehicleCard;
