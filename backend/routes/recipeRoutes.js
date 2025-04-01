const express = require("express");
const router = express.Router();
const {
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe
} = require("../controllers/recipeController");

router.post("/generate", generateRecipe); 
router.post("/save", saveRecipe); 
router.get("/saved/:userId", getSavedRecipes); 
router.delete("/delete/:recipeId", deleteRecipe); 

module.exports = router;
