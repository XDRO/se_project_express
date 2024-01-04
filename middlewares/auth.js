// work on this
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { HTTP_UNAUTHORIZED } = require("../utils/error");

const handleAuthError = (res) => {
  return res.status(HTTP_UNAUTHORIZED).send({ message: "Authorization Error" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }
  const token = extractBearerToken(authorization);
  // const token = authorization.replace("Bearer ", "");
  // let payload = jwt.verify(token, JWT_SECRET);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
