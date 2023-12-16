const user = require("../models/user");

const createUser = (req, res, next) => {
  console.log(req);
  console.log(res.body);

  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      next(e);
    });
};

const getUsers = (req, res, next) => {
  const { ObjectId } = req.params;
  user
    .find({ ObjectId })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      next(e);
    });
};

const getUserById = (req, res, next) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

module.exports = { createUser, getUserById, getUsers };

// If later on you want to find a user then update the avatar you might want these:
// const { avatar } = req.body;
// { $set: { avatar } }
