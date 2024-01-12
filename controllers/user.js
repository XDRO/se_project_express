const user = require("../models/user");
// will remove this after async await refactor of all functions
const {
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_OK_REQUEST,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} = require("../utils/error");

const { JWT_SECRET } = require("../utils/config");

const bcrypt = require("bcryptjs"); // use for sign up

const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
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

    res.send(responseData);
  } catch (e) {
    next(e);
  }
};

// Come back and try to refactor all function into async await functions,
// this will help clean up the code, as well as only needing the validation for users
// update user controller

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  const { name, avatar } = req.body;
  user
    .findByIdAndUpdate(
      userId,
      { $set: { name, avatar } },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.status(HTTP_OK_REQUEST).send({ data: user }))
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res
          .status(HTTP_BAD_REQUEST)
          .json({ message: "validation error" });
      } else {
        next(e);
      }
    });
};

const getCurrentUser = (req, res) => {
  const id = req.user._id;
  user
    .findById(id)
    .orFail()
    .then((user) => {
      if (!user) {
        return res.status(HTTP_NOT_FOUND).json({ error: "User not found" });
      }
      const { id, name, avatar, email } = user;
      const userResponse = { id, name, avatar, email };

      res.json(userResponse);
      // console.log(userResponse);
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
      console.error(e);
      if (e.name === "INVALID_EMAIL_PASSWORD") {
        return res.status(HTTP_BAD_REQUEST).send({ message: e.message });
      } else {
        res.status(HTTP_UNAUTHORIZED).send({ message: e.message });
      }
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login };
