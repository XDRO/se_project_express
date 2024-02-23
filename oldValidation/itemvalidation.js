const { default: isURL } = require("validator/lib/isURL");

const { HttpBadRequest } = require("../utils/error");

module.exports = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    if (!name || name.length < 2 || name.length > 30) {
      const error = new Error("Name is an incorrect length or field is empty");
      error.statusCode = HttpBadRequest;
      throw error;
    }
    if (!weather) {
      const error = new Error("Weather selection is required");
      error.statusCode = HttpBadRequest;
      throw error;
    }
    if (!imageUrl || !isURL(imageUrl)) {
      const error = new Error("Image Url is invalid");
      error.statusCode = HttpBadRequest;
      throw error;
    }
  } catch (e) {
    return next(e);
  }
  return next();
};
