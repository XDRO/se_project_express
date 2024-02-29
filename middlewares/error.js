module.exports.globalErrorHandler = async (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
  return next();
};
