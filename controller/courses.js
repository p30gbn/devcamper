// Add depedencies

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// Add resource model

const Course = require("../model/Course");

// @route GET /courses
// @desc Get all courses
// @route GET /bootcamps/:bootcampId/courses
// @desc Get all courses for specific bootcamp
// @privilage Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({
      bootcamp: req.params.bootcampId,
    });
  } else {
    query = Course.find();
  }

  query = query.populate({
    path: "bootcamp",
    model: "Bootcamp",
  });
  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
