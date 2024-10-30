const mongoose = require('mongoose');
const Recipe = require('./Models/recipeModel');

// Connect to your MongoDB database
var url = process.env.DB_CONNECTION_STR
mongoose.connect(url, {})
    .then(() => console.log("connected succefully to mongoDB!"))
    .catch(err => console.error("something went wrong",err))

// Sample data
const initialData = [
    {
      "title": "Recipe 1",
      "ingredients": [
        {"name": "Ingredient 1", "quantity": "1 cup"},
        {"name": "Ingredient 2", "quantity": "2 cups"}
      ],
      "instructions": ["Step 1: Do this", "Step 2: Do that"],
      "cuisine": "Your Cuisine",
      "preparationTime": 30,
      "imageUrl": "https://example.com/recipe-image-1.jpg",
      "createdBy": "Chef A"
    },
    {
      "title": "Recipe 2",
      "ingredients": [
        {"name": "Ingredient A", "quantity": "3 cups"},
        {"name": "Ingredient B", "quantity": "1 cup"}
      ],
      "instructions": ["Step A: Do this", "Step B: Do that"],
      "cuisine": "Another Cuisine",
      "preparationTime": 45,
      "imageUrl": "https://example.com/recipe-image-2.jpg",
      "createdBy": "Chef B"
    }
    // Add more recipes as needed
  ];
  
  // Insert initial data into the database
  Recipe.insertMany(initialData)
    .then(result => {
      console.log('Inserted documents:', result);
    })
    .catch(error => {
      console.error('Error inserting documents:', error);
    });