const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

const { HTTP_NOT_FOUND } = require("../utils/error");

const auth = require("../middlewares/auth");

const userValidation = require("../middlewares/userValidation");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

router.use("/signin", login);
router.use("/signup", userValidation, createUser);
router.use("/items", clothingItem);

// will need authentication
router.use("/users", auth, user);
router.use("/users/me", auth, updateUser, getCurrentUser);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;

// run this npm run lint
