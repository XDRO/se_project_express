const { HttpInternalServerError } = require("../utils/error");

module.exports.globalErrorHandler = async (error, req, res, next) => {
  res.status(error.statusCode || HttpInternalServerError).json({
    message: error.message,
  });
  return next();
};
