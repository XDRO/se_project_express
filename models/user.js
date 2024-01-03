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
    },
    // hash password
    password: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("user", userSchema);

// 1st task
// add email and password fields both fields required
// for validation use https://www.npmjs.com/package/validator
// also create a file for validation and import it, create in utils
// this is to check the email ONLY as of now
