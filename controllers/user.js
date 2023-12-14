const users = require("../models/user");

const createUser = (req, res) => {
  console.log(req);
  console.log(res.body);

  const { name, avatar } = req.body;

  users
    .create({ name, about, avatar })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  users
    .findById(userId, { $set: { avatar } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Get user failed from getUser", e });
    });
};

const getUsers = (req, res) => {
  users
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Get Users failed from getUsers", e });
    });
};

module.exports = { createUser, getUser, getUsers };
