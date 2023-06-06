const dotenv = require("dotenv");

// configure environment variables

dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const vehiclesRoutes = require("./src/routes/vehicles");
const remindersRoutes = require("./src/routes/reminders");
const ownersRoutes = require("./src/routes/owners");
const paymentsRoutes = require("./src/routes/payments");
const authenticationRoutes = require("./src/routes/auth");

// middleware

const errorHandler = require("./src/middleware/error");

// initialize the app
const port = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(cors());

// initialize the routes

app.use("/vehicles", vehiclesRoutes);
app.use("/reminders", remindersRoutes);
app.use("/owners", ownersRoutes);
app.use("/payments", paymentsRoutes);
app.use("/auth", authenticationRoutes);

// Error handler should be last piece of middleware
app.use(errorHandler);
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// connect to database
mongoose
  .connect(process.env.DATABASE_URL, {
    family: 4,
  })
  .then(async () => {
    console.log("DATABASE CONNECTED");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
