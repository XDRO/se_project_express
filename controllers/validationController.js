const user = require("../models/user");
const { HTTP_BAD_REQUEST, HTTP_CONFLICT } = require("../utils/error");

module.exports.userValidation = async (req, res, next) => {
  try {
    const { name, avatar, email } = req.body;

    if (!name || name.length < 2 || name.length > 30) {
      const error = new Error();
      error.statusCode = HTTP_BAD_REQUEST;
      error.message = "name is required";
      return next(error);
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
      const error = new Error();
      error.statusCode = HTTP_BAD_REQUEST;
      error.message = "avatar is required";
      return next(error);
    }
    if (!email) {
      const error = new Error();
      error.statusCode = HTTP_BAD_REQUEST;
      error.message = "Not a valid email";
      return next(error);
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const duplicateError = new Error({ message: "Email already in use" });
      duplicateError.statusCode = HTTP_CONFLICT;
      throw duplicateError;
    }
  } catch (e) {
    return next(e);
  }
  return next();
};
