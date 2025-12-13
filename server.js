const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config", "config.env"),
});
const colors = require("colors");
const bootcamps = require("./router/bootcamps");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in on port ${PORT}`);
});
