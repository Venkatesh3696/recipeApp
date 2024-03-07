const Recipe = require("../models/recipe.model");

//get all recipies from server
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});
    res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Create =>create a new recipe
const createRecipe = async (req, res) => {
  console.log("accessed post route");
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Read => get a specific recipe
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Update => update a specific recipe by id
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body);

    if (!recipe) {
      return res
        .status(404)
        .json({ message: "the recipe you are trying to access is not found" });
    }
    const updatedRecipe = await Recipe.findById(id);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific recipe
const DeleteRecipe = async (req, res) => {
  console.log("accessed delete route");
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOneAndDelete(id);
    if (!recipe) {
      return res.status(404).json({
        message: "the recipe you are trying to delete is not available",
      });
    }
    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  DeleteRecipe,
};
