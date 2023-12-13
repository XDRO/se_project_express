const users = require("../models/user");

const createUser = (req, res) => {
  console.log(req);
  console.log(res.body);

  const { name, avatar } = req.body;

  users
    .create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      res.status(500).send({ message: "Get user failed from getUser", e });
    });
};

const getUsers = (req, res) => {
  users
    .find({})
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      res.status(500).send({ message: "Get Users failed from getUsers", e });
    });
};

module.exports = { createUser, getUser, getUsers };
