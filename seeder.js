// Add needs packages

const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "config", "config.env"),
});
const fs = require("fs");
const colors = require("colors");
const mongoose = require("mongoose");

// Add models

const Bootcamp = require("./model/Bootcamp");
const Course = require("./model/Course");

// Read data from files

const bootcamps = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_data", "bootcamps.json"))
);
const courses = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_data", "courses.json"))
);

// Connected to database

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.DB_URI, {});
};
connectDb();

// Import data functionality

const importData = async () => {
  try {
    const bootcamp = await Bootcamp.create(bootcamps);
    const course = await Course.create(courses);

    console.log("Data imported ...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data functionality

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();

    console.log("Data Deleted ...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Choose wich functionality is used

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
