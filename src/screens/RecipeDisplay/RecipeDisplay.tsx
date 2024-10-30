import React from 'react';
import './RecipeDisplay.css'

const RecipeDisplay = ({ recipe, onReceiveRecipe }) => {
  const { title, ingredients_name,ingredients_quantity, instructions, cuisine, preparationTime, imageUrl, createdBy } = recipe;



  return (
    <div id='recipeDisplay'>
      <h2>{title}</h2>
      <p>Ingredients: {ingredients_name}</p>   
      <p>Amount: {ingredients_quantity}</p>
      <p>Instructions: {instructions}</p>
      <p id='cuisine'>Cuisine: {cuisine}</p>
      <p id='prepTime'>Preparation Time: {preparationTime}</p>
      <img id='recipeImg' src={imageUrl} alt="" />
      <p id='creator'>Created By: {createdBy}</p>
    </div>
  );
};

export default RecipeDisplay;
