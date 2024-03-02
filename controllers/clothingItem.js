const { default: mongoose } = require("mongoose");

const { HttpBadRequest } = require("../utils/errors/HttpBadRequest");
const { HttpNotFound } = require("../utils/errors/HttpNotFound");
const { HttpForbidden } = require("../utils/errors/HttpForbidden");
const {
  HttpInternalServerError,
} = require("../utils/errors/HttpInternalServerError");

const clothingItems = require("../models/clothingItem");

module.exports.createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl, createdAt } = req.body;
    const owner = req.user._id;

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

    return res.send(responseData);
  } catch (e) {
    if (e.name === "ValidationError") {
      return next(new HttpBadRequest("ValidationError"));
    }
    return next(e);
  }
};

module.exports.getItems = async (req, res, next) => {
  try {
    const items = await clothingItems.find({});
    return res.status(200).send(items);
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const reqUser = req.user._id;
    const item = await clothingItems.findById({ _id: itemId });

    if (item === null) {
      return next(new HttpNotFound("item not found"));
    }

    const { owner } = item;

    if (!owner.equals(reqUser)) {
      return next(new HttpForbidden("Not Authorized"));
    }

    await clothingItems.deleteOne({ _id: itemId });

    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new HttpBadRequest("Cast Error"));
    }

    return next(new HttpInternalServerError("Delete item unsuccessful"));
  }
};

module.exports.likeItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await clothingItems
      .findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
      .orFail();

    return res.status(200).send({ data: item });
  } catch (e) {
    if (e instanceof mongoose.CastError) {
      const castError = new Error(e.message);
      castError.statusCode = HttpBadRequest;
      return next(castError);
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      const notFoundError = new Error(e.message);
      notFoundError.statusCode = HttpNotFound;
      return next(notFoundError);
    }
    return next(e);
  }
};

module.exports.dislikeItem = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const item = await clothingItems
      .findByIdAndUpdate(
        itemId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
      .orFail();

    return res.status(200).send({ data: item });
  } catch (e) {
    if (e instanceof mongoose.CastError) {
      const castError = new Error(e.message);
      castError.statusCode = HttpBadRequest;
      return next(castError);
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      const notFoundError = new Error(e.message);
      notFoundError.statusCode = HttpNotFound;
      return next(notFoundError);
    }
    return next(e);
  }
};
