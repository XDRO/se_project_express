const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HttpUnauthorized } = require("../utils/error");

const handleAuthError = (res, message) =>
  // res
  //   .status(HttpUnauthorized)
  //   .send({ message: message || "Authorization Error" });

  (module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return handleAuthError(res);
    }

    const token = authorization.replace("Bearer ", "");

    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch {
      return handleAuthError(res, "Invalid token");
    }

    return next();
  });
