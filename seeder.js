const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config", "config.env"),
});
const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");

const Bootcamp = require("./model/Bootcamp");

const bootcamps = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_data", "bootcamps.json"))
);

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {});
};
connectDb();

const importData = async () => {
  const bootcamp = await Bootcamp.create(bootcamps);
  console.log("Data imported ...".green.inverse);
};

const deleteData = async () => {
  await Bootcamp.deleteMany();
  console.log("Data Deleted ...".red.inverse);
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
