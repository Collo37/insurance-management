import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { Add, CarRental, Groups2Rounded, Send } from "@mui/icons-material";

const QuickActions = ({ setModalVariant }) => {
  const navigate = useNavigate();

  const goTo = (route) => {
    navigate(route);
  };

  const actions = [
    {
      action: "New Owner",
      icon: <Add />,
      function: () => setModalVariant("owner"),
    },
    {
      action: "New Vehicle",
      icon: <CarRental />,
      function: () => setModalVariant("vehicle"),
    },
    {
      action: "View Owners",
      icon: <Groups2Rounded />,
      function: () => goTo("/owners"),
    },
    {
      action: "Send Bulk Mail",
      icon: <Send />,
      function: () => console.log("Send mail"),
    },
  ];
  return (
    <Box
      width="100%"
      height="fit-content"
      maxHeight="220px"
      padding="0 10px"
      display="flex"
      gap="20px"
      maxWidth="600px"
      flexWrap="wrap"
    >
      {actions.map((action, index) => {
        return (
          <IconButton
            onClick={action.function}
            sx={{
              width: 90,
              height: 90,
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#fff",
              color: "var(--primary)",
              border: "1px solid var(--primary)",
              // boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.082)",
            }}
            key={index}
          >
            {action.icon}
            <Typography fontSize="14px">{action.action}</Typography>
          </IconButton>
        );
      })}
    </Box>
  );
};

export default QuickActions;
