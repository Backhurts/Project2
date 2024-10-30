const recipeModel = require("../recipeModel");
ObjectId = require("mongodb").ObjectId;

const Recipe = recipeModel.Recipe;

const getAllRecipes = async () => {
  const x = await Recipe.find(); // retrieves every instance of Recipe in the DB
  console.log(`getAllRecipes ${JSON.stringify(x)}`);
  return JSON.parse(JSON.stringify(x));
};
exports.getAllRecipes = getAllRecipes;

const getRecipeByID = async (theID) => {
  console.log("theID");
  const x = await Recipe.findOne({ _id: theID });
  console.log(`getRecipeByID ${JSON.stringify(x)}`);

  if (x === null) {
    // -1 means no records found, easier than 0 to work with in terms of logic
    return { numOfRecordsFound: -1 }; //returns an object, not a value
  } else {
    return x;
  }
};
exports.getRecipeByID = getRecipeByID;

const addNewRecipe = async (recipeInfo) => {
  console.log("--", JSON.stringify(recipeInfo));
  const newRecipe = new Recipe(recipeInfo);
  try {
    const x = await newRecipe.save();
    console.log("addRecipe");
    return `added new recipe with ID ${x._id}`;
  } catch (err) {
    console.log("error while trying to add new recipe", err);
  }
};
exports.addNewRecipe = addNewRecipe;

const updateRecipe = async (recipeID, recipeInfo) => {
  console.log("trying to update recipe with ID ", recipeID);

  const x = await Recipe.updateOne({ _id: recipeID }, recipeInfo);
  console.log(`updateRecipeByID ${JSON.stringify(x)}`);
  return JSON.stringify(x);
};
exports.updateRecipe = updateRecipe;

const deleteRecipeByID = async (theID) => {
  const x = await Recipe.deleteOne({ _id: theID });
  console.log(`deleteRecipeByID ${JSON.stringify(x)}`);
  return `deleted ${x.deletedCount || 0} documents`;
};
exports.deleteRecipeByID = deleteRecipeByID;

const deleteAllRecipes = async () => {
  const x = await Recipe.deleteMany();
  console.log(`deleteRecipeByID ${JSON.stringify(x)}`);
  return `deleted ${x.deletedCount || 0} documents`;
};
exports.deleteAllRecipes = deleteAllRecipes;
