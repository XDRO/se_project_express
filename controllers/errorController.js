const { HTTP_INTERNAL_SERVER_ERROR } = require("../utils/error");

module.exports.globalErrorHandler = (error, req, res, next) => {
  // console.error(error);
  res.status(error.statusCode || HTTP_INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
  next();
};

// // This goes in the route file
// // router.patch("/me", validateUserPatch, updateUserData);
