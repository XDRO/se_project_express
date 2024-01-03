const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  MONGO_DB_DUPLICATE_ERROR,
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

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      next(e);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e instanceof mongoose.CastError) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
        const notFoundError = new Error(e.message);
        notFoundError.statusCode = HTTP_NOT_FOUND;
        next(notFoundError);
      } else {
        next(e);
      }
    });
};

const login = (req, res) => {
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
      // hanlde error properly
      res.status(401).send({ message: e.message });
    });
};

module.exports = { createUser, getUserById, getUsers, login };
