const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const itemValidation = require("../middlewares/itemvalidation");

// const cardValidation = require("../middlewares/joivalidation");

const auth = require("../middlewares/auth");

router.post("/", auth, itemValidation, cardValidation, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId", auth, deleteItem);

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
