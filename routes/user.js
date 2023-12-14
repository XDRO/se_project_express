const router = require("express").Router();

const { createUser, getUsers, getUser } = require("../controllers/user");

// Create
router.post("/", createUser);
// read
router.get("/", getUsers);

router.get("/:userId", getUser);

module.exports = router;