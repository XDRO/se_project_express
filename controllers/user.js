const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  MONGO_DB_DUPLICATE_ERROR,
  HTTP_UNAUTHORIZED,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../utils/error");

const { JWT_SECRET } = require("../utils/config");

const bcrypt = require("bcryptjs"); // use for sign up

const jwt = require("jsonwebtoken");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  user
    .create({ name, avatar, email, password })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        const validationError = new Error(e.message);
        validationError.statusCode = HTTP_BAD_REQUEST;
        next(validationError);
      } else if (e.statusCode === 11000) {
        const duplicateKeyError = new Error(e.message);
        duplicateKeyError.statusCode = MONGO_DB_DUPLICATE_ERROR;
        throw duplicateKeyError;
      } else {
        next(e);
      }
    });
};

// const getUsers = (req, res, next) => {
//   user
//     .find({})
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       next(e);
//     });
// };

// edit this function
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  user
    .findById(userId)
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(HTTP_NOT_FOUND).json({ error: "User not found" });
      }
      const { id: _id, name, avatar, email } = user;
      const userResponse = { id: _id, name, avatar, email };

      res.json(userResponse);
      console.log(userResponse);
    })
    .catch((e) => {
      console.error("Error fetching user from the database: ", e);
      res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return user
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      console.log(e.name);
      if (e.name === "INVALID_EMAIL_PASSWORD") {
        return res.status(400).send({ message: e.message });
      } else {
        res.status(401).send({ message: e.message });
      }
    });
};

module.exports = { createUser, getCurrentUser, login };
