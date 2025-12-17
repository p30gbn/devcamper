// Add depedencies

const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config", "config.env"),
});
const colors = require("colors");

// Add routers file

const bootcamps = require("./router/bootcamps");
const courses = require("./router/courses");

const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in on port ${PORT}`);
});
