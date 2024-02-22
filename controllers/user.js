const bcrypt = require("bcryptjs"); // use for sign up

const jwt = require("jsonwebtoken");

const user = require("../models/user");

// will remove this when I create global error handling for all errors
const { HTTP_NOT_FOUND, HTTP_UNAUTHORIZED, HTTP_OK_REQUEST, HTTP_BAD_REQUEST } =
  require("../utils/error").default;

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
      return next(new HTTP_BAD_REQUEST("Validation error"));
    }
    return next(e);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const id = req.user._id;

    const userData = await user.findById(id).orFail();

    if (!userData) {
      return next(new HTTP_NOT_FOUND("User not found"));
    }

    const { _id, name, avatar, email } = userData;
    const userResponse = { id: _id, name, avatar, email };

    return res.json(userResponse);
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
      return next(new HTTP_UNAUTHORIZED("Invalid email or password"));
    }
    return next(e);
  }
};
