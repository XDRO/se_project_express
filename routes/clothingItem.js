const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const {
  validateCardBody,
  validateId,
} = require("../middlewares/joivalidation");

const auth = require("../middlewares/auth");

// console.log({ auth, validateCardBody, validateId, createItem });

router.post("/", auth, validateCardBody, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, validateId, likeItem);

router.delete("/:itemId", auth, validateId, deleteItem);

router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
