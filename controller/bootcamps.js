// Add depedencies

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");

// Add resource model

const Bootcamp = require("../model/Bootcamp");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const keyArray = Object.keys(reqQuery);
  keyArray.forEach((item) => {
    if (
      item.endsWith("$lte") ||
      item.endsWith("$lt") ||
      item.endsWith("$gt") ||
      item.endsWith("$gte") ||
      item.endsWith("$in")
    ) {
      const splitedItem = item.split(".");
      reqQuery[[splitedItem[0]]] = {
        [splitedItem[1]]: reqQuery[item],
      };
      delete reqQuery[item];
    }
  });

  const removedFields = ["select", "sort", "page", "limit"];

  removedFields.forEach((item) => {
    delete reqQuery[item];
  });

  query = Bootcamp.find(reqQuery);

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Add paggination

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments(reqQuery);

  query = query.skip(startIndex).limit(limit);

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  query = query.populate({
    path: "courses",
  });

  const bootcamps = await query;
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

exports.getSingleBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(404, `Bootcamp not founded with id ${req.params.id}`)
    );
    return;
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    next(
      new ErrorResponse(404, `Bootcamp not founded with id ${req.params.id}`)
    );
    return;
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    next(
      new ErrorResponse(404, `Bootcamp not founded with id ${req.params.id}`)
    );
    return;
  }

  await bootcamp.deleteOne();

  res.status(204).json({
    success: true,
    data: {},
  });
});

exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lon = loc[0].longitude;
  const radius = distance / 6371;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lon, lat], radius],
      },
    },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
