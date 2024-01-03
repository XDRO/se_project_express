const router = require("express").Router();

const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require("../controllers/user");

router.post("/", createUser);

router.post("/signin", login);

router.get("/", getUsers);

router.get("/:userId", getUserById);

module.exports = router;
