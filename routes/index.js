const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

const { HTTP_NOT_FOUND } = require("../utils/error");

const auth = require("../middlewares/auth");

const {
  userLogin,
  validateUserInfoBody,
} = require("../middlewares/joivalidation");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.use("/signin", userLogin, login);
router.use("/signup", validateUserInfoBody, createUser);
router.use("/items", clothingItem);

router.use("/users", auth, user);
router.use("/users/me", auth, updateUser, getCurrentUser);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;

// run this npm run lint
