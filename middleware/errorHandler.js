const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);

  if (err.name === "CastError") {
    const message = `Resource not founded with id ${err.value}`;
    error = new ErrorResponse(404, message);
  }
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(400, message);
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((item) => item.message);
    error = new ErrorResponse(400, message);
  }

  res.status(error.status || 500).json({
    succes: false,
    error: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
