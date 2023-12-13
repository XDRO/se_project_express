const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
