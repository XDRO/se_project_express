const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

const { HTTP_NOT_FOUND } = require("../utils/error");

const auth = require("../middlewares/auth");

const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../controllers/user");

router.use("/signin", login);
router.use("/signup", createUser, (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => createUser({ email: req.body.email, password: hash }));
});
router.use("/items", clothingItem);

// will need authentication
router.use("/users", auth, user);
router.use("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateUser);

router.use((req, res) => {
  res.status(HTTP_NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
