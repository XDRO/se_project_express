const { default: mongoose } = require("mongoose");
const user = require("../models/user");
const { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } = require("../utils/error");

const createUser = (req, res, next) => {
  // 2nd task is to update this controller
  // in addition to the name and avatar fields as seen below, this controller should also include email and password
  // all data must be contained in req body, possibly in the .create and .then methods or maybe create a header, payload, and signature
  // line above is speculation
  // check if there is not an already an exsiting user with a matching email to the one in the req body
  const { name, avatar } = req.body;
  user
    .create({ name, avatar })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        const validationError = new Error(e.message);
        validationError.statusCode = HTTP_BAD_REQUEST;
        next(validationError);
      }
      next(e);
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

module.exports = { createUser, getUserById, getUsers };
