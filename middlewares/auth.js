const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HttpUnauthorized } = require("../utils/error");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new HttpUnauthorized("Authorization header is missing"));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch {
    return next(new HttpUnauthorized("Invalid token"));
  }

  return next();
};
