const router = require("express").Router();

const { createItem, getItems } = require("../controllers/clothingItem");
// Crud

// Create
router.post("/", createItem);

// read
router.get("/", getItems);
// update
router.put("/:itemId", updateItem);

// delete

module.exports = router;
