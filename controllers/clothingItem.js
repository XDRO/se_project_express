const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(res.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Get items failed from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.param;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res
        .status(500)
        .send({ message: "update items failed from updateItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
};
