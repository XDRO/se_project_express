const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// I might need middle ware to give access to secific users,
// to preform certain actions

const auth = require("../middlewares/auth");

router.post("/", auth, createItem);

router.get("/", getItems);

router.put("/:itemId/likes", auth, likeItem);

router.delete("/:itemId", auth, deleteItem);

router.delete("/:itemId/likes", auth, dislikeItem);

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
