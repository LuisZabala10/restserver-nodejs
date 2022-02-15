const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

//contoller
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");
const validateFields = require("../middlewares/validate-fields");

// public
router.get("/", getCategories);
// public
router.get("/:id", getCategoryById);
// with a valid token
router.post("/", createCategory);
// with a valid token
router.put("/:id", updateCategory);
// admin change state
router.delete("/:id", deleteCategory);

module.exports = router;
