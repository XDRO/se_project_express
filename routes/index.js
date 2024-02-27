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

router.post("/signin", userLogin, login);
// I believe that below would need to be post
router.post("/signup", validateUserInfoBody, createUser);
// since this one has been organized inside of the other routes, it shouldn't be necessary to refactor
router.use("/items", clothingItem);
// using PATCH and GET requests through the route below split them into two
router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateUser);

router.use((req, res, next) => next(HttpNotFound("Router not found")));

module.exports = router;

// run this npm run lint
