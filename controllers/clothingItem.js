const { default: mongoose } = require("mongoose");

const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK_REQUEST,
  HTTP_FORBIDDEN,
} = require("../utils/error");
const clothingItems = require("../models/clothingItem");

module.exports.createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl, createdAt } = req.body;
    console.log({ name, weather, imageUrl, createdAt });
    const owner = req.user._id;
    // console.log({ owner });
    // createdAt undefined at this point

    const newItem = await clothingItems.create({
      name,
      weather,
      imageUrl,
      createdAt,
      owner,
    });

    const responseData = {
      _id: newItem._id,
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
      createdAt: newItem.createdAt,
      owner: newItem.owner,
    };

    res.send(responseData);
  } catch (e) {
    next(e);
  }
};

module.exports.getItems = (req, res, next) => {
  clothingItems
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

module.exports.deleteItem = (req, res) => {
  const itemId = req.params.itemId;
  console.log(req.params);
  console.log({ itemId });
  const reqUser = req.user._id;
  clothingItems.findById({ _id: itemId }).then((item) => {
    if (item === null) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "item does not exist" });
    }
    // still need to work on this below
    if (item.owner.toString() != reqUser.toString()) {
      return res.status(HTTP_FORBIDDEN).json({ message: "Not authorized" });
    } else if (item) {
      clothingItems
        .deleteOne({ _id: itemId })
        .then(() => {
          return res.status(HTTP_OK_REQUEST).json({ message: "Item deleted" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Delete item unsuccessful" });
        });
    } else if (e.name === "CastError") {
      return res.status(HTTP_BAD_REQUEST).json({ message: "Cast error" });
    }
  });
};

module.exports.likeItem = (req, res, next) => {
  const itemId = req.params.itemId;
  console.log({ itemId });
  clothingItems
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e instanceof mongoose.CastError) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
        const notFoundError = new Error(e.message);
        notFoundError.statusCode = HTTP_NOT_FOUND;
        next(notFoundError);
      } else {
        next(e);
      }
    });
};

module.exports.dislikeItem = (req, res, next) => {
  const itemId = req.params.itemId;
  clothingItems
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      if (e instanceof mongoose.CastError) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
        const notFoundError = new Error(e.message);
        notFoundError.statusCode = HTTP_NOT_FOUND;
        next(notFoundError);
      } else {
        next(e);
      }
    });
};
