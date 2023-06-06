import React from "react";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton as IconBtn,
} from "@chakra-ui/react";
import {
  Menu as MenuIcon,
  Person,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FlexBetween from "../FlexBetween/FlexBetween";

const Navbar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    alert("You are succesfully logged out");
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        position: "relative",
        background: "none",
        boxShadow: "none",
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/** Left side of the app bar */}
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            borderRadius="9px"
            gap="3rem"
            p="0.1em 1.5rem"
          ></FlexBetween>
        </FlexBetween>
        {/** Right side of the app bar */}
        <FlexBetween gap="1.5rem">
          <Menu size={55} bg="var(--primary)">
            <MenuButton
              as={IconBtn}
              aria-label="Options"
              icon={<ArrowDropDownOutlined />}
              name="Menu"
              title="Menu"
              bg="var(--primary)"
              color="#fff"
              borderRadius={10}
              style={{
                outline: "none",
                border: "none",
                cursor: "pointer",
                width: "40px",
                height: 40,
              }}
            />
            <MenuList
              bg="var(--primary)"
              p="10"
              borderRadius={10}
              height={100}
              width={120}
              boxShadow="2px 3px 5px rgba(0, 0, 0, 0.5)"
              style={{ zIndex: 1000 }}
            >
              <MenuItem
                bg="transparent"
                mt={10}
                style={{
                  outline: "none",
                  border: "none",
                  textAlign: "right",
                  borderBottom: "1px solid #ffffff50",
                  justifyContent: "flex-end",
                }}
              >
                User Name
              </MenuItem>
              <MenuItem
                bg="transparent"
                mt={10}
                style={{
                  outline: "none",
                  border: "none",
                  textAlign: "right",
                  cursor: "pointer",
                  borderBottom: "1px solid #ffffff50",
                  justifyContent: "flex-end",
                }}
                icon={<Person sx={{ fontSize: "25px", fill: "#fff" }} />}
                onClick={handleLogOut}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
