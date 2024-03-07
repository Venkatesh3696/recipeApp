const express = require("express");

const Recipe = require("../../models/recipe.model");

// add auth middleware for

//
const {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  DeleteRecipe,
} = require("../../controllers/recipes.controllers");

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", DeleteRecipe);

module.exports = router;
