require('dotenv').config()
const mongoose = require('mongoose')

var url = process.env.DB_CONNECTION_STR

// Schema for the recipes

const recipeSchema = new mongoose.Schema({
  title: { type: String },
  ingredients_name: String, 
  ingredients_quantity: String ,
  instructions: String,
  cuisine: String,
  preparationTime: String,
  imageUrl: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports.Recipe = mongoose.model("Recipe", recipeSchema)
