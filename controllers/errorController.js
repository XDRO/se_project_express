const {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
} = require("../utils/error");

module.exports.globalErrorHandler = (error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || HTTP_INTERNAL_SERVER_ERROR).json({
    message: error.message,
  });
  next();
};

module.exports.createUserErrors = async (error, req, res, next) => {
  try {
    const { name, avatar, email } = req.body;
    if (name.length == 2 || name.length > 30) {
      const validationError = new Error({ message: error.message });
      validationError.statusCode = HTTP_BAD_REQUEST;
      throw validationError;
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const duplicateEmailError = new Error({ message: error.message });
      duplicateEmailError.statusCode = HTTP_CONFLICT;
      throw duplicateEmailError;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const validationError = new Error({ message: error.message });
      validationError.statusCode = HTTP_BAD_REQUEST;
      throw validationError;
    }
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!avatar || isValidUrl(avatar)) {
      return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
    }
  } catch {
    console.log(error);
  }
};
