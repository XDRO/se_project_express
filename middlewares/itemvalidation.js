const { default: isURL } = require("validator/lib/isURL");

const { HTTP_BAD_REQUEST } = require("../utils/error");

const { Joi, celebrate } = require("celebrate");

const validator = require("validator");

module.exports = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    if (!name || name.length < 2 || name.length > 30) {
      const error = new Error("Name is an incorrect length or field is empty");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
    if (!weather) {
      const error = new Error("Weather selection is required");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
    if (!imageUrl || !isURL(imageUrl)) {
      const error = new Error("Image Url is invalid");
      error.statusCode = HTTP_BAD_REQUEST;
      throw error;
    }
  } catch (e) {
    return next(e);
  }
  return next();
};
