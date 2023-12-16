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

const getUser = (req, res, next) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  user
    .findById(userId, { $set: { avatar } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      next(e);
    });
};

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

module.exports = { createUser, getUser, getUsers };
