const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
    minlength: [2, "Name cannot be less than 2 characters"],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }).then((user) => {
    // not found
    if (!user) {
      const error = new Error("incorrect email or password");
      error.name = "INVALID_EMAIL_PASSWORD";
      return Promise.reject(error);
    }
    console.log(password);
    if (!password || !email) {
      const error = new Error("incorrect email or password");
      error.name = "INVALID_EMAIL_PASSWORD";
      return Promise.reject(error);
    }
    // found
    return bcrypt
      .compare(password, user.password && email, user.email)
      .then((matched) => {
        if (!matched) {
          const error = new Error("incorrect email or password");
          error.name = "INVALID_EMAIL_PASSWORD";
          return Promise.reject(error);
        }
        return user;
      });
  });
};
module.exports = mongoose.model("user", userSchema);
