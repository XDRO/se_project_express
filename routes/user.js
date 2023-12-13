const router = require("express").Router();

const { createUser, getUsers, getUser } = require("../controllers/user");

// Create
router.post("/users", createUser);
// read
router.get("/users", getUsers);

router.get("/users/:userId", getUser);

module.exports = router;
