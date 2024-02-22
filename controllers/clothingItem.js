const { default: mongoose } = require("mongoose");

const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK_REQUEST,
  HTTP_FORBIDDEN,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../utils/error").default;

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
      return next(new HTTP_NOT_FOUND("item not found"));
    }

    const { owner } = item;

    if (!owner.equals(reqUser)) {
      return next(new HTTP_FORBIDDEN("Not Authorized"));
    }

    await clothingItems.deleteOne({ _id: itemId });

    return res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new HTTP_BAD_REQUEST("Cast Error"));
    }

    return next(new HTTP_INTERNAL_SERVER_ERROR("Delete item unsuccessful"));
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
      castError.statusCode = HTTP_BAD_REQUEST;
      return next(castError);
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      const notFoundError = new Error(e.message);
      notFoundError.statusCode = HTTP_NOT_FOUND;
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
      castError.statusCode = HTTP_BAD_REQUEST;
      return next(castError);
    }
    if (e instanceof mongoose.Error.DocumentNotFoundError) {
      const notFoundError = new Error(e.message);
      notFoundError.statusCode = HTTP_NOT_FOUND;
      next(notFoundError);
    }
    return next(e);
  }
};
