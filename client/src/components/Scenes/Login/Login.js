import React, { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginIcon } from "@mui/icons-material";

import { axiosInstance } from "../../../axios";

const Login = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [details, setDetails] = useState({});

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", details);

      const token = res.data.token;
      localStorage.setItem("authToken", token);

      setMessage({ type: "success", text: "Successfully logged in" });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setMessage({ type: "error", text: err.response.data.error });
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="20px"
      sx={{
        backgroundImage:
          "linear-gradient(180deg, var(--primary) 50%, #fff 50%)",
      }}
    >
      <Box
        width="100%"
        maxWidth="380px"
        height="440px"
        padding="30px 20px"
        backgroundColor="#fff"
        borderRadius="15px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="2px 10px 10px rgba(0, 0, 0, 0.2)"
      >
        <Typography
          fontFamily="Poppins"
          textTransform="uppercase"
          variant="h4"
          fontSize="25px"
          textAlign="center"
          sx={{ width: "100%", color: "var(--primary)" }}
        >
          Log in
        </Typography>
        <Box
          width="100%"
          height="50px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            fontFamily="Poppins"
            color={
              message.type === "error" ? "var(--warning)" : "var(--primary)"
            }
          >
            {message.text}
          </Typography>
        </Box>
        <TextField
          label="Email"
          type="email"
          sx={{
            width: "100%",
            height: "50px",
            "& .Mui-focused": {
              color: "var(--primary) !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary) !important",
            },
          }}
          className="text-input"
          onChange={(event) =>
            setDetails({ ...details, email: event.target.value })
          }
        />
        <TextField
          label="Password"
          type="password"
          sx={{
            width: "100%",
            height: "50px",
            "& .Mui-focused": {
              color: "var(--primary) !important",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--primary) !important",
            },
          }}
          onChange={(event) =>
            setDetails({ ...details, password: event.target.value })
          }
        />
        <IconButton
          variant="contained"
          onClick={handleLogIn}
          sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "var(--primary)",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        >
          Log in
          <LoginIcon />
        </IconButton>
        <Box width="100%" height="20px" display="flex" alignItems="center">
          <Link to="/forgotpassword" style={{ color: "var(--primary)" }}>
            Forgot Password?
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
