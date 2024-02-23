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

console.log({ auth, validateCardBody, validateId, createItem });

router.post("/", auth, validateCardBody, validateId, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId", auth, deleteItem);

router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
