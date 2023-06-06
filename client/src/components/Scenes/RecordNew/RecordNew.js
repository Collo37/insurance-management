import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  Card,
} from "@mui/material";
import { Add, Close, Delete, Save } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";

import { axiosInstance } from "../../../axios";
import PaymentsContext from "../../../context/paymentsContext";
import VehiclesContext from "../../../context/vehiclesContext";

import Heading from "../../Heading/Heading";

import styles from "./styles.module.css";

const RecordNew = () => {
  const [showForm, setShowForm] = useState(false);
  const [regNumbers, setRegNumbers] = useState([]);
  const [unfilteredPayments, setUnfilteredPayments] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionCode, setTransactionCode] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);

  const { vehicles, getVehicles, filterOn } = useContext(VehiclesContext);
  const { payments, getPayments } = useContext(PaymentsContext);

  const handleAddPayment = async (payment) => {
    const { amount, vehicleId, expiryDate, paymentMethod } = payment;

    if (
      amount === 0 ||
      vehicleId === "" ||
      paymentMethod === "" ||
      expiryDate === null
    ) {
      alert("Fields cannot be empty");
      return;
    } else {
      try {
        const res = await axiosInstance.post("/payments", payment, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        alert(res.data.message);
        window.location.reload();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const handleSearch = (key) => {
    setUnfilteredPayments(
      payments.filter((payment) =>
        payment?.vehicleId?.registrationNumber.includes(key.toUpperCase())
      )
    );
  };

  useEffect(() => {
    if (vehicles.length === 0 || filterOn) {
      getVehicles();
    }
    if (payments.length === 0) getPayments();
    setRegNumbers(vehicles.map((vehicle) => vehicle.registrationNumber));
    setUnfilteredPayments(payments);
  }, [vehicles, unfilteredPayments.length]);

  return (
    <Box width="100%" height="100" padding="0 20px">
      <Heading title="Manage Payments" subtitle="Record and manage payments" />
      {/** Add new payment section */}
      <Box width="100%" height="fit-content">
        <Box
          width="100%"
          height="80px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontFamily="Poppins" fontSize="20px">
            Record new payment
          </Typography>
          <IconButton
            onClick={() => setShowForm(true)}
            sx={{
              width: "100px",
              height: "50px",
              backgroundColor: "var(--primary)",
              color: "#fff",
              borderRadius: "10px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "var(--primary)",
                filter: "brightness(1.15)",
              },
            }}
          >
            New
            <Add />
          </IconButton>
        </Box>
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5, ease: "easeIn" },
              }}
              exit={{ opacity: 0 }}
              className={styles.form_container}
            >
              <Box width="100%" gap="10px" marginTop="15px">
                <Typography fontFamily="Poppins">Vehicle</Typography>
                <select
                  style={{ width: "150px", height: "56px" }}
                  label="Vehicle"
                >
                  {vehicles.length > 0 &&
                    regNumbers.sort().map((regNumber, index) => {
                      let id = vehicles.find(
                        (vehicle) => vehicle.registrationNumber === regNumber
                      )["_id"];
                      return (
                        <option
                          key={index}
                          value={id}
                          onClick={() => setVehicleId(id)}
                          onChange={() => setVehicleId(id)}
                        >
                          {regNumber}
                        </option>
                      );
                    })}
                </select>
              </Box>
              <TextField
                type="number"
                label="Amount"
                sx={{
                  width: "150px",
                  height: "50px",
                  marginTop: "15px",
                  "& .Mui-focused": {
                    color: "var(--primary) !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary) !important",
                  },
                }}
                onChange={(event) => setAmount(parseInt(event.target.value))}
              />
              <Typography fontFamily="Poppins" sx={{ marginTop: "15px" }}>
                Payment Method
              </Typography>
              <RadioGroup
                sx={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <Box
                  height="fit-content"
                  marginRight="15px"
                  marginTop="15px"
                  width="120px"
                >
                  <Typography fontFamily="Poppins">Cash</Typography>
                  <Radio
                    label="Cash"
                    value="Cash"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    sx={{
                      width: 50,
                      height: 50,
                      color: "var(--primary) !important",
                    }}
                  />
                </Box>
                <Box
                  height="fit-content"
                  marginRight="15px"
                  marginTop="15px"
                  width="120px"
                >
                  <Typography fontFamily="Poppins">Mobile Money</Typography>
                  <Radio
                    label="Mobile Money"
                    value="Mobile Money"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    sx={{
                      width: 50,
                      height: 50,
                      color: "var(--primary) !important",
                    }}
                  />
                </Box>

                <Box
                  height="fit-content"
                  marginRight="15px"
                  marginTop="15px"
                  width="120px"
                >
                  <Typography fontFamily="Poppins">Bank Payment</Typography>
                  <Radio
                    label="Bank Payment"
                    value="Bank Payment"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    sx={{
                      width: 50,
                      height: 50,
                      color: "var(--primary) !important",
                    }}
                  />
                </Box>
                <Box
                  height="fit-content"
                  marginRight="15px"
                  marginTop="15px"
                  width="120px"
                >
                  <Typography fontFamily="Poppins">Other</Typography>
                  <Radio
                    label="Other"
                    value="Other"
                    onClick={(event) => setPaymentMethod(event.target.value)}
                    sx={{
                      width: 50,
                      height: 50,
                      color: "var(--primary) !important",
                    }}
                  />
                </Box>
              </RadioGroup>
              <TextField
                type="text"
                label="Transaction Code"
                sx={{
                  width: "100%",
                  height: "50px",
                  maxWidth: "320px",
                  marginTop: "15px",
                  "& .Mui-focused": {
                    color: "var(--primary) !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary) !important",
                  },
                }}
                onChange={(event) => setTransactionCode(event.target.value)}
              />
              <TextField
                type="date"
                label="Expiry Date"
                sx={{
                  marginTop: "15px",
                  width: "100%",
                  maxWidth: "320px",
                  "& .Mui-focused": {
                    color: "var(--primary) !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary) !important",
                  },
                }}
                onChange={(event) => setExpiryDate(event.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                gap="15px"
                margin="15px 0"
              >
                <IconButton
                  onClick={() => setShowForm(false)}
                  sx={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "var(--warning)",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "var(--warning)",
                      filter: "brightness(1.15)",
                    },
                  }}
                >
                  Close
                  <Close />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleAddPayment({
                      amount,
                      vehicleId,
                      paymentMethod,
                      transactionCode,
                      expiryDate,
                      transactionDate: new Date(Date.now()),
                    })
                  }
                  sx={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "var(--primary)",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "var(--primary)",
                      filter: "brightness(1.15)",
                    },
                  }}
                >
                  Save
                  <Save />
                </IconButton>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
      {/** Manage existing payments section */}
      <Box width="100%" height="fit-content" gap="15px" marginTop="30px">
        <Typography
          fontFamily="Poppins"
          fontSize="20px"
          sx={{ color: "var(--primary)", marginBottom: "15px" }}
        >
          Manage
        </Typography>
        {payments.length > 0 && (
          <Box width="100%" height="fit-content">
            <TextField
              label="search payments"
              sx={{
                width: "100%",
                maxWidth: "320px",
                marginBottom: "15px",
                "& .Mui-focused": {
                  color: "var(--primary) !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary) !important",
                },
              }}
              onChange={(event) => handleSearch(event.target.value)}
            />
            <Box
              width="100%"
              height="fit-content"
              display="flex"
              flexWrap="wrap"
              gap="5px"
            >
              {unfilteredPayments.map((payment, index) => {
                return <PaymentCard key={index} payment={payment} />;
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const PaymentCard = ({ payment }) => {
  const [showBtn, setShowBtn] = useState(false);
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "320px",
        height: "200px",
        marginBottom: "15px",
        padding: "10px",
      }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      onClick={() => setShowBtn(!showBtn)}
    >
      <Typography
        fontFamily="Poppins"
        fontSize="20px"
        sx={{ color: "var(--primary)" }}
      >
        {payment?.vehicleId?.registrationNumber}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="16px">
        Amount: {payment?.amount}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="16px">
        Transaction Code: {payment?.transactionCode}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="16px">
        Date Recorded: {payment?.transactionDate}
      </Typography>
      <Typography fontFamily="Poppins" fontSize="16px">
        Expiry Date: {new Date(payment?.expiryDate).toDateString()}
      </Typography>
      <AnimatePresence mode="wait">
        {showBtn && (
          <motion.span
            className={styles.delete_btn_container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <IconButton
              onClick={() => {}}
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "var(--warning)",
              }}
            >
              <Delete />
            </IconButton>
          </motion.span>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default RecordNew;
