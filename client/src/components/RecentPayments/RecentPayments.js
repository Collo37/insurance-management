import React from "react";
import { Box, Typography } from "@mui/material";

const Row = ({ registrationNumber, amount, expiry, index }) => {
  return (
    <Box
      width="100%"
      maxWidth="400px"
      height="120px"
      display="flex"
      flexDirection="column"
      padding="10px"
      borderBottom="1px solid gray"
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        height="20px"
        marginBottom="10px"
      >
        <Typography
          color="var(--primary)"
          sx={{ marginRight: "20px" }}
          fontFamily="Poppins"
        >
          {index + 1}
        </Typography>
        <Typography color="var(--primary)" fontFamily="Poppins">
          {registrationNumber?.toUpperCase()}
        </Typography>
      </Box>
      <Box width="100%" height="40px" margin="0 0 10px 20px">
        <Typography fontFamily="Poppins">Amount: {amount}</Typography>
        <Typography fontFamily="Poppins">
          Expiry Date: {new Date(expiry).toDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

const RecentPayments = ({ recentPayments }) => {
  return (
    <Box
      width="100%"
      height="fit-content"
      gap="10px"
      display="flex"
      flexWrap="wrap"
    >
      {recentPayments?.length > 0 ? (
        recentPayments.map((payment, index) => {
          return (
            <Row
              registrationNumber={payment.vehicleId?.registrationNumber}
              amount={payment.amount}
              index={index}
              key={index}
              expiry={payment.expiryDate}
            />
          );
        })
      ) : (
        <Typography>Loading recent payments...</Typography>
      )}
    </Box>
  );
};

export default RecentPayments;
