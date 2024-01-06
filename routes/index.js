const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

const { HTTP_NOT_FOUND } = require("../utils/error");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
  getUsers,
} = require("../controllers/user");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/signin", login);
router.use("/signup", createUser);
router.use("/users/me", getCurrentUser);
router.use("/users", getUsers);
router.patch("/users/me", updateUser);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
