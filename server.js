const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bootcamps = require("./router/bootcamps");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const app = express();

dotenv.config({ path: "./config/config.env" });
app.use(express.json());

app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);
connectDb();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in on port ${PORT}`);
});
