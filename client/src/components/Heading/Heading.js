import React from "react";
import { Box, Typography } from "@mui/material";

const Heading = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h2"
        fontFamily="Poppins"
        textAlign="left"
        fontSize="30px"
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontFamily="Poppins"
        textAlign="left"
        fontSize="24px"
        color="var(--primary)"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Heading;
