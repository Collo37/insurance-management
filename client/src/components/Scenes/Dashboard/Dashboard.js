import React, { useEffect, useContext, useState } from "react";
import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DashboardContext from "../../../context/dashboardContext";

import QuickActions from "../../QuickActions/QuickActions";
import QuickStats from "../../QuickStats/QuickStats";
import RecentPayments from "../../RecentPayments/RecentPayments";
import ExpiringSoon from "../../ExpiringSoon/ExpiringSoon";
import Modal from "../../Modal/Modal";

const Dashboard = () => {
  const isDesktop = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const { recentPayments, getPayments, vehicleStats, getVehicleStats } =
    useContext(DashboardContext);

  const [modalVariant, setModalVariant] = useState(null);

  useEffect(() => {
    !vehicleStats.pastDue && getVehicleStats();
    recentPayments.length === 0 && getPayments();
  }, []);

  return (
    <Box
      width="100%"
      height={isDesktop ? "calc(100% - 70px)" : "fit-content"}
      display="flex"
      flexWrap="wrap"
      padding="20px"
    >
      {modalVariant !== null ? (
        <Modal variant={modalVariant} setModalVariant={setModalVariant} />
      ) : null}
      <Box
        width="100%"
        display="flex"
        height="fit-content"
        justifyContent="space-between"
        flexWrap="wrap"
        gap="20px"
      >
        <Box flex="2" height="100%" maxWidth="600px">
          <Typography
            sx={{ marginBottom: "30px", fontSize: "20px" }}
            variant="h3"
          >
            Quick Actions
          </Typography>
          <QuickActions setModalVariant={setModalVariant} />
          <QuickStats
            pastDue={vehicleStats?.pastDue?.length}
            totalVehicles={vehicleStats?.total}
          />
        </Box>
        <Box
          flex="1"
          height="fit-content"
          minWidth="300px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          overflow="hidden"
        >
          <Typography
            variant="h3"
            fontFamily="Poppins"
            fontSize="20px"
            marginLeft="10px"
          >
            Expiring Soon {`(${vehicleStats?.expiringSoon?.length})`}
          </Typography>
          <ExpiringSoon vehicles={vehicleStats?.expiringSoon} />
        </Box>
      </Box>
      <Box width="100%" height="fit-content" minHeight="200px" margin="30px 0">
        <Box
          width="100%"
          maxWidth="900px"
          height="fit-content"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3" fontSize="20px" fontFamily="Poppins">
            Recent Payments
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/all-payments")}
            sx={{ color: "var(--primary)", borderColor: "var(--primary)" }}
          >
            All Payments
          </Button>
        </Box>
        <RecentPayments recentPayments={recentPayments} />
      </Box>
    </Box>
  );
};

export default Dashboard;
