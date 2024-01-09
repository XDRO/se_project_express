const { HTTP_BAD_REQUEST, HTTP_CONFLICT } = require("../utils/error");
const user = require("../models/user");
const { default: isEmail } = require("validator/lib/isEmail");

module.exports.userValidation = async (req, res, next) => {
  try {
    const { name, avatar, email } = req.body;

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
  } catch (e) {
    return next(e);
  }
  return next();
};

// const isValidUrl = (url) => {
//   try {
//     new URL(url);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };
// console.log({ avatar });
// if (!avatar || isValidUrl(avatar)) {
//   console.log({ avatar });
//   const error = new Error();
//   error.statusCode = HTTP_BAD_REQUEST;
//   error.message = "avatar is required";
//   return next(error);
// }
// console.log({ email });
