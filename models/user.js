const mongoose = require("mongoose");
const validator = require("validator");

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
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "You must enter a valid email address",
      },
    },
    // hash password
    password: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
