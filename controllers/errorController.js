const {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
} = require("../utils/error");

module.exports.globalErrorHandler = (error, req, res, next) => {
  // console.error(error);
  res.status(error.statusCode || HTTP_INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
  next();
};

module.exports.createUserErrors = async (error, req, res, next) => {
  console.log("create user errors is running");
  res
    .status(error.statusCode || HTTP_BAD_REQUEST)
    .json({ message: error.message });
  next();
};
