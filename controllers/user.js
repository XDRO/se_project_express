const bcrypt = require("bcryptjs"); // use for sign up

const jwt = require("jsonwebtoken");

const user = require("../models/user");
const { HttpBadRequest } = require("../utils/errors/HttpBadRequest");
const { HttpNotFound } = require("../utils/errors/HttpNotFound");
const { HttpConflict } = require("../utils/errors/HttpConflict");
const { HttpUnauthorized } = require("../utils/errors/HttpUnauthorized");

const { JWT_SECRET } = require("../utils/config");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      avatar,
      email,
      password: hash,
    });

    const responseData = {
      newUser: {
        name: newUser.name,
        avatar: newUser.avatar,
        email: newUser.email,
      },
    };

    return res.send(responseData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("ValidationError"));
    }
    if (e.code === 11000) {
      return next(new HttpConflict("Duplicate email error"));
    }
    return next(e);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, avatar } = req.body;

    const userData = await user
      .findByIdAndUpdate(
        userId,
        { $set: { name, avatar } },
        { new: true, runValidators: true },
      )
      .orFail();

    return res.status(200).send({ data: userData });
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("Validation error"));
    }
    return next(e);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const userData = await user.findById(_id).orFail();

    if (!userData) {
      return next(new HttpNotFound("User not found"));
    }

    // const { _id: id, name, avatar, email } = userData;
    // const userResponse = { _id: id, name, avatar, email };

    // return res.json(userResponse);
    return res.json(userData);
  } catch (e) {
    return next(e);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.send({ token });
  } catch (e) {
    if (e.name === "INVALID_EMAIL_PASSWORD") {
      return next(new HttpUnauthorized("Invalid email or password"));
    }
    return next(e);
  }
};
