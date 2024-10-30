const myRepository = require("../Models/Repository/recipeRepository.js")


const getAllRecipes = async (req,res)=>{
    let results = await myRepository.getAllRecipes()
    res.json(results)
}
module.exports.getAllRecipes= getAllRecipes



const getRecipeByID = async (req,res) => {
    let results = await myRepository.getRecipeByID(req.params.id)
    if (results.numOfRecordsFound && results.numOfRecordsFound === -1){
        res.status(404).json(results);
    }
    else {
        res.status(200).json(results);
    }
}
module.exports.getRecipeByID = getRecipeByID



const addNewRecipe = async (req, res) => {
    console.log('Received POST request with data:', req.body);
    let body = req.body
    let results = await myRepository.addNewRecipe(body)
    res.json(results)
}
module.exports.addNewRecipe = addNewRecipe



const updateRecipe = async (req,res) => {
    let theID = req.params.id
    let body = req.body
    let results = await myRepository.updateRecipe(theID,body)
    res.json(results)
}
module.exports.updateRecipe = updateRecipe


const deleteRecipeByID = async (req,res) => {
    let theID = req.params.id
    let results = await myRepository.deleteRecipeByID(theID)
    res.json(results)
}
module.exports.deleteRecipeByID = deleteRecipeByID


const deleteAllRecipes = async (req,res)=>{
    let results = await myRepository.deleteAllRecipes()
    res.json(results)
}
module.exports.deleteAllRecipes= deleteAllRecipes