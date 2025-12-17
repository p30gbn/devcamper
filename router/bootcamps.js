// Add depedencies

const { Router } = require("express");
const courseRouter = require("./courses");

// Add controllers

const {
  getBootcamps,
  createBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampInRadius,
} = require("../controller/bootcamps");

// Initialize router

const router = Router();

router.use("/:bootcampId/courses", courseRouter);

// Add controllers to routes

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampInRadius);

// Export router

module.exports = router;
