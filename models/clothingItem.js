const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
    enum: ["Hot", "Warm", "Cold"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },
    likes: {},
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
