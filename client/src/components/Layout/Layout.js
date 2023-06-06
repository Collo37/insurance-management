import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { VehiclesProvider } from "../../context/vehiclesContext";
import { DashboardProvider } from "../../context/dashboardContext";
import { OwnersProvider } from "../../context/ownersContext";
import { PaymentsProvider } from "../../context/paymentsContext";

import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(isNonMobile);
  const [hasToken, setHasToken] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.getItem("authToken") && setHasToken(true);
    !localStorage.getItem("authToken") && navigate("/login");
  }, [pathname]);

  return (
    hasToken && (
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <SideBar
          isNonMobile={isNonMobile}
          drawerWidth="260px"
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <PaymentsProvider>
            <OwnersProvider>
              <VehiclesProvider>
                <DashboardProvider>
                  <Outlet />
                </DashboardProvider>
              </VehiclesProvider>
            </OwnersProvider>
          </PaymentsProvider>
        </Box>
      </Box>
    )
  );
};

export default Layout;
