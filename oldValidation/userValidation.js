const { default: isEmail } = require("validator/lib/isEmail");

const { default: isURL } = require("validator/lib/isURL");

const { HttpBadRequest, HttpConflict } = require("../utils/error");

const user = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { name, avatar, email } = req.body;
    if (!name || name.length < 2 || name.length > 30) {
      const error = new Error("Name is an incorrect length or field is empty");
      error.statusCode = HttpBadRequest;
      throw error;
    }
    if (!email || !isEmail(email)) {
      const error = new Error("Not a valid email address");
      error.statusCode = HttpBadRequest;
      throw error;
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already in use");
      error.statusCode = HttpConflict;
      throw error;
    }
    if (!avatar || !isURL(avatar)) {
      const error = new Error("Avatar URL is invalid");
      error.statusCode = HttpBadRequest;
      throw error;
    }
  } catch (e) {
    return next(e);
  }
  return next();
};
