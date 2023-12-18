const ClothingItem = require("../models/clothingItem");
const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK_REQUEST,
} = require("../utils/error");
const mongoose = require("mongoose");

const createItem = (req, res, next) => {
  console.log(req);
  console.log(res.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        const validationError = new Error(e.message);
        validationError.statusCode = HTTP_BAD_REQUEST;
        next(validationError);
      }
      next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(new Error("User not found"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (
        e instanceof mongoose.CastError ||
        (e.name === "Error" && e.message === "User not found")
      ) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      }
      next(e);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      if (e instanceof mongoose.CastError) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
        const notFoundError = new Error(e.message);
        notFoundError.statusCode = HTTP_OK_REQUEST;
        next(notFoundError);
      } else {
        next(e);
      }
    });
};

const likeItem = (req, res, next) => {};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};

// module.exports.createItem = (req, res) => {
//   console.log(req.user._id);
// };

// if (e instanceof mongoose.CastError) {
//   const castError = new Error(e.message);
//   castError.statusCode = HTTP_BAD_REQUEST;
//   next(castError);
// }
