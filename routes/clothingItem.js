const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const itemValidation = require("../middlewares/itemvalidation");

// I might need middle ware to give access to secific users,
// to preform certain actions

const auth = require("../middlewares/auth");

router.post("/", auth, itemValidation, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId", auth, deleteItem);

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
