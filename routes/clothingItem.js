const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId/likes", likeItem);

router.delete("/:itemId", deleteItem);

router.delete("/:itemId/likes", dislikeItem);

module.exports = router;

// Routes for clothing items:
// GET /items to return all items from the database

// POST /items to create an item with name , imageUrl , and weather passed in the
// request body. owner should be set from the req.user._id
// Project 13. Checklist 4
// DELETE /items/:id to delete an item by _id . The user can’t delete a card that
// they didn’t create
// PUT /items/:id/likes to like an item ( new: true is passed to options)
// DELETE /items/:id/likes to unlike an item ( new: true is passed to options)
