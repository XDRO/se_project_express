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

module.exports.deleteItem = async (req, res, next) => {
  try {
    const clothingItem = require("../models/clothingItem");
    const { itemId } = req.params;
    const user = req.user._id;
    const userIdObjectId = mongoose.Types.ObjectId(user);
    const item = await clothingItem.find({
      _id: itemId,
      owner: userIdObjectId,
      // { _id: clothingItem, owner }
    });
    // console.log({ user });
    console.log({ item });

    if (!item) {
      return res.status(HTTP_NOT_FOUND).json({ error: "Item not found" });
    }

    if (item.owner.toString() != user.toString()) {
      console.log({ owner });
      console.log(req.user._id);
      const error = new Error("Permission not granted");
      error.statusCode = HTTP_FORBIDDEN;
      throw error;
    }

    const responseData = {
      owner: item.owner._id,
    };

    // console.log(responseData);
    res.send(responseData);
  } catch (e) {
    next(e);
  }
};

// module.exports.deleteItem = (req, res, next) => {
//   const { itemId } = req.params;
//   const owner = itemId.equals(clothingItems.owner);
//   // someObjectId.equals(someStringOrObjectId)
//   const userId = req.user._id;
//   // req.user.userId._id
//   const userIdObjectId = mongoose.Types.ObjectId(userId);
//   clothingItems
//     .find({ _id: itemId, owner: userIdObjectId })
//     // .findByIdAndDelete(itemId)
//     .orFail()
//     .then((item) => {
//       // if (userIdObjectId != userId) {
//       //   return res.status(403).json({ message: "forbidden" });
//       // }
//       res.status(HTTP_OK_REQUEST).send({ item });
//     })
//     .catch((e) => {
//       if (e instanceof mongoose.CastError) {
//         const castError = new Error(e.message);
//         castError.statusCode = HTTP_BAD_REQUEST;
//         next(castError);
//       } else if (e instanceof mongoose.Error.DocumentNotFoundError) {
//         const notFoundError = new Error(e.message);
//         notFoundError.statusCode = HTTP_NOT_FOUND;
//         next(notFoundError);
//       } else {
//         next(e);
//       }
//     });
// };

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
