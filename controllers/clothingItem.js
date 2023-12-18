const ClothingItem = require("../models/clothingItem");
const { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } = require("../utils/error");

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
        e.name === "CastError" ||
        (e.name === "Error" && e.message === "User not found")
      ) {
        return res.status(HTTP_BAD_REQUEST).send({ data: null });
      } else {
        next(e);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      next(e);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};

// module.exports.createItem = (req, res) => {
//   console.log(req.user._id);
// };
