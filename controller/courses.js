// Add depedencies

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// Add resource model

const Course = require("../model/Course");
const Bootcamp = require("../model/Bootcamp");
const { json } = require("express");

// @route GET /courses
// @desc Get all courses
// @route GET /bootcamps/:bootcampId/courses
// @desc Get all courses for specific bootcamp
// @access Public

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

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    next(new ErrorResponse(404, `Course not founded with id ${req.params.id}`));
    return;
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    next(
      new ErrorResponse(
        404,
        `Course associated bootcamp not founded with id ${req.params.bootcampId}`
      )
    );
    return;
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @route PUT /courses/:id
// @desc Update course
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    next(new ErrorResponse(404, `Course not founded with id ${req.params.id}`));
    return;
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @route DELETE /courses/:id
// @desc Delete course
// @access Private

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    next(new ErrorResponse(404, `Course not found with id ${req.params.id}`));
    return;
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
