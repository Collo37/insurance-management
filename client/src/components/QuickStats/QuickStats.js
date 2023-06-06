import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";

const QuickStats = ({ pastDue, totalVehicles }) => {
  const stats = [
    {
      title: "Past Due",
      value: pastDue || 0,
      color: "var(--warning)",
    },
    {
      title: "Total Vehicles",
      value: totalVehicles || 0,
      color: "var(--primary)",
    },
  ];

  return (
    <Box
      width="100%"
      height="fit-content"
      gap="20px"
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      padding="0 10px"
      marginTop="20px"
    >
      {stats.map((stat, index) => {
        return (
          <Card
            key={index}
            sx={{
              backgroundColor: stat.color,
              flex: "1",
              minWidth: "220px",
              maxWidth: "300px",
              height: "120px",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Typography
              variant="h3"
              fontSize="20px"
              color="#fff"
              fontFamily="Poppins"
            >
              {stat.title}
            </Typography>
            <Divider />
            <Typography
              variant="h3"
              fontSize="30px"
              color="#fff"
              fontFamily="Poppins"
            >
              {stat.value}
            </Typography>
          </Card>
        );
      })}
    </Box>
  );
};

export default QuickStats;
