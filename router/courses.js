// Add depedencies

const { Router } = require("express");

// Add controllers

const { getCourses } = require("../controller/courses");

// Initialize router

const router = Router({ mergeParams: true });

// Add controllers to routes

router.route("/").get(getCourses);

// Export router

module.exports = router;
