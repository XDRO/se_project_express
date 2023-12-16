const user = require("../models/user");

const createUser = (req, res) => {
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
      // console.error(e);
      // res.status(500).send({ message: "Error from createUser", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  user
    .findById(userId, { $set: { avatar } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      // console.error(e);
      // res.status(500).send({ message: "Get user failed from getUser", e });
    });
};

const getUsers = (req, res) => {
  user
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      // console.error(e);
      // res.status(500).send({ message: "Get Users failed from getUsers", e });
    });
};

module.exports = { createUser, getUser, getUsers };
