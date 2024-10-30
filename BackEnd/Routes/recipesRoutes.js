const express = require('express')
const router = express.Router()
const{
    getAllRecipes,
    getRecipeByID,
    addNewRecipe,
    updateRecipe,
    deleteRecipeByID,
    deleteAllRecipes
} = require("../Controllers/recipeController.js")




// ----------- GET ----------- (read all)
router.get("/",getAllRecipes)

// // ----------- GET + ID ----------- (read specific ID)
router.get("/:id",getRecipeByID)

// // ----------- PUT ----------- (update through all fields)
router.put ("/:id",updateRecipe)

// // ----------- DELETE + ID ----------- (Delete specific ID)
router.delete ("/:id",deleteRecipeByID)

// // ----------- DELETE  ----------- (Delete all)
router.delete ("/",deleteAllRecipes)

// // ----------- POST ----------- (add new recipe)
router.post ("/",addNewRecipe)

module.exports= router