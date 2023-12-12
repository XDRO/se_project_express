const mongoose = require("mongoose");
const validator = require("validator");

// let ObjectId = mongoose.Schema.ObjectId;

const avatarImage = new mongoose.Schema({
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
      // categoryId: ObjectId,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
