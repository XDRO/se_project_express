const router = require("express").Router();

// const user = require("./user");

const clothingItem = require("./clothingItem");

const { HttpNotFound } = require("../utils/error");

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

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// post
router.post("/signin", userLogin, login);
// post
router.post("/signup", validateUserInfoBody, createUser);
// use
router.use("/items", clothingItem);
// get
router.get("/users/me", auth, getCurrentUser);
// patch
router.patch("/users/me", auth, updateUser);

router.use((req, res, next) => next(HttpNotFound("Router not found")));

module.exports = router;

// run this npm run lint
