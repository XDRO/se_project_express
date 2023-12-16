const ClothingItem = require("../models/clothingItem");

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
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
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
