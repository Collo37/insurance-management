import React from "react";
import { Box, Typography } from "@mui/material";

const Row = ({ registrationNumber, owner, expiry, index }) => {
  return (
    <Box
      width="100%"
      minHeight="120px"
      margin="10px 0"
      padding="10px"
      borderBottom="1px solid #fff"
    >
      <Typography
        fontFamily="Poppins"
        fontSize="16px"
        variant="h3"
        color="#fff"
      >
        {index + 1}
        {". "}
        {registrationNumber.toUpperCase()}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="14px" color="#fff">
        Due: {new Date(expiry).toDateString()}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="14px" color="#fff">
        Owner: {owner.name}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="14px" color="#fff">
        Phone: {owner.phone}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="14px" color="#fff">
        Email: {owner.email}
      </Typography>
    </Box>
  );
};

const ExpiringSoon = ({ vehicles }) => {
  return (
    <Box
      width="100%"
      height="300px"
      backgroundColor="var(--primary)"
      borderRadius="30px"
      marginTop="30px"
      padding="10px"
      sx={{ overflowY: "scroll" }}
    >
      {vehicles?.length > 0 ? (
        vehicles.map((vehicle, index) => {
          return (
            <Row
              registrationNumber={vehicle.registrationNumber}
              owner={vehicle.ownerId}
              expiry={vehicle.expiryDate}
              index={index}
              key={index}
            />
          );
        })
      ) : (
        <Typography fontFamily="Poppins">
          There are no payments due in 10 days
        </Typography>
      )}
    </Box>
  );
};

export default ExpiringSoon;
