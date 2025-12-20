// Add depedencies

const { Router } = require("express");

// Add controllers

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

// Initialize router

const router = Router({ mergeParams: true });

// Add controllers to routes

router.route("/").get(getCourses).post(addCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

// Export router

module.exports = router;
