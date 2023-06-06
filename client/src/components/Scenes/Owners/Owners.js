import React, { useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Heading from "../../Heading/Heading";
import OwnersContext from "../../../context/ownersContext";

const Owner = ({ _id, name, phone, email, noOfVehicles }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "250px",
        height: "200px",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <Typography
          textAlign="left"
          color="var(--primary)"
          sx={{ fontSize: 20 }}
          gutterBottom
        >
          {name.toUpperCase()}
        </Typography>
        <Typography
          textAlign="left"
          variant="h5"
          sx={{ width: "100%", fontSize: "16px" }}
          fontFamily="Poppins"
          fontSize="16px"
        >
          Email: {email}
        </Typography>
        <Typography
          textAlign="left"
          variant="h5"
          sx={{ width: "100%", fontSize: "16px" }}
          fontFamily="Poppins"
        >
          Phone: {phone}
        </Typography>
        <Typography fontFamily="Poppins">Vehicles: {noOfVehicles}</Typography>
      </CardContent>
    </Card>
  );
};

const Owners = () => {
  const { owners, getOwners } = useContext(OwnersContext);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  useEffect(() => {
    owners.length === 0 && getOwners();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Heading
        title="Owners"
        subtitle={`View all registered owners (${owners?.length})`}
      />
      {owners?.length > 0 ? (
        <Box mt="20px" display="flex" flexWrap="wrap" gap="20px">
          {owners.map((owner) => {
            return (
              <Owner
                key={owner?._id}
                _id={owner?._id}
                name={owner?.name}
                email={owner?.email}
                phone={owner?.phone}
                noOfVehicles={owner?.vehicles?.length}
              />
            );
          })}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Owners;
