import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween/FlexBetween";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  CarRental,
  Error,
  ManageAccounts,
  Payment,
  Edit,
  Groups2Outlined,
} from "@mui/icons-material";

const SideBar = ({
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Vehicles",
      icon: null,
    },
    {
      text: "All Vehicles",
      icon: <CarRental />,
    },
    {
      text: "Expiring Soon",
      icon: <Error />,
    },
    {
      text: "Manage",
      icon: <ManageAccounts />,
    },
    {
      text: "Payments",
      icon: null,
    },
    {
      text: "All Payments",
      icon: <Payment />,
    },
    {
      text: "Record New",
      icon: <Edit />,
    },
    {
      text: "More",
      icon: null,
    },
    {
      text: "Owners",
      icon: <Groups2Outlined />,
    },
  ];

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav" zIndex="100">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "gray",
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    fontFamily="Poppins"
                  >
                    INSU-REMIND
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{ padding: "10px" }}>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 1rem" }}
                      textAlign="left"
                      fontFamily="Poppins"
                    >
                      {text}
                    </Typography>
                  );
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          active === text.toLowerCase().split(" ").join("-")
                            ? "var(--primary)"
                            : "transparent",
                        color:
                          active === text.toLowerCase().split(" ").join("-")
                            ? "#fff"
                            : "var(--primary)",
                        borderRadius: "15px",
                      }}
                      onClick={() => {
                        navigate(`/${text.toLowerCase().split(" ").join("-")}`);
                        setActive(text.toLowerCase().split(" ").join("-"));
                        !isNonMobile && setIsSideBarOpen(!isSideBarOpen);
                      }}
                    >
                      {active === text.toLowerCase().split(" ").join("-") && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                      <ListItemText
                        primary={text}
                        sx={{ fontFamily: "Poppins" }}
                        fontFamily="Poppins"
                      />
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === text.toLowerCase().split(" ").join("-")
                              ? "#fff"
                              : "var(--primary)",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
