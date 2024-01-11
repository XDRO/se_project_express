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

// module.exports.deleteItem = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const item = await clothingItems.findById(id).orFail();
//     console.log({ item });

//     if (!item.owner.equals(req.user._id)) {
//       return res.status(403).send("Permission not granted");
//     }

//     await clothingItems.deleteOne(item);

//     res.status(200).send("Item deleted successfully");
//   } catch (e) {
//     next(e);
//   }
// };

module.exports.deleteItem = (req, res, next) => {
  // Pull the ID from the params
  const { id } = req.params;

  // Search for the item by ID
  clothingItems
    .findById(id)
    .orFail() // if no such item is found, an error will be thrown
    .then((item) => {
      // here is where you need to compare the item's owner to the current user's ID
      // item.owner already is an ObjectID. req.user._id is a string, and that's fine
      if (!item.owner.equals(req.user._id)) {
        // forbidden
        return res.status(403).json({ message: "forbidden" });
      } else {
        // if not forbidden, then we can delete the request
        clothingItems.deleteOne(item).then((item) => {
          return res.status(HTTP_OK_REQUEST).send({ item });
        });
      }
    })
    .catch((e) => {
      // handle errors
      if (e instanceof mongoose.CastError) {
        const castError = new Error(e.message);
        castError.statusCode = HTTP_BAD_REQUEST;
        next(castError);
      } else {
        next(e);
      }
    });
};

// module.exports.deleteItem = (req, res, next) => {
//   const userId = req.user._id;

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
