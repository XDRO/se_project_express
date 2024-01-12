const { HTTP_BAD_REQUEST, HTTP_CONFLICT } = require("../utils/error");
const user = require("../models/user");
const { default: isEmail } = require("validator/lib/isEmail");
const { default: isURL } = require("validator/lib/isURL");
module.exports = async (req, res, next) => {
  try {
    const { name, avatar, email } = req.body;
    // const e = new Error("ValidationError");
    // if (e.name === "ValidationError") {
    //   const error = new Error("Validation error");
    //   error.statusCode = HTTP_BAD_REQUEST;
    //   throw error;
    // }
    if (!name || name.length < 2 || name.length > 30) {
      const error = new Error("Name is an incorrect length or field is empty");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
    if (!email || !isEmail(email)) {
      console.log({ email });
      const error = new Error("Not a valid email address");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      console.log({ email });
      const error = new Error("Email already in use");
      error.statusCode = HTTP_CONFLICT;
      throw error;
    }
    if (!avatar || !isURL(avatar)) {
      const error = new Error("Avatar URL is invalid");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
  } catch (e) {
    return next(e);
  }
  return next();
};
