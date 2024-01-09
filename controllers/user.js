const user = require("../models/user");
const {
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_BAD_REQUEST,
} = require("../utils/error");

const { JWT_SECRET } = require("../utils/config");

const bcrypt = require("bcryptjs"); // use for sign up

const jwt = require("jsonwebtoken");

// const { createUserErrors } = require("./errorController");

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    // const hasSignUpErrors = await createUserErrors();
    // if (hasSignUpErrors) {
    //   return res
    //     .status(HTTP_BAD_REQUEST)
    //     .json({ message: "Error from user sign up" });
    // }

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

// update user controller
const updateUser = (req, res) => {
  // get user from the req.user._id not the req.params
  const { userId } = req.params;
  const { avatar } = req.body;
  const { name } = req.body;

  user
    .findByIdAndUpdate(userId, { $set: { avatar } }, { new: true })
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Error from update user", e });
    });
};

// edit this function
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
      console.error(e);
      if (e.name === "INVALID_EMAIL_PASSWORD") {
        return res.status(400).send({ message: e.message });
      } else {
        res.status(401).send({ message: e.message });
      }
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login };
