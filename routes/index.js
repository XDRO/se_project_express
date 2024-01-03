const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

const { HTTP_NOT_FOUND } = require("../utils/error");

const { createUser, login } = require("../controllers/user");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/signin", login);
router.use("/signup", createUser);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
