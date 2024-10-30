import './App.css';
import React, { useState } from 'react'
import  InputInfo  from './screens/InputInfo/InputInfo.tsx';
import ActionButton from './screens/ActionButton/ActionButton.tsx';
import RecipeDisplay from './screens/RecipeDisplay/RecipeDisplay.tsx';

function App() {
  const [currentRecipe,setCurrentRecipe] = useState({

    title: 'Example Recipe',
    ingredients_name: "Ingredient",
    ingredients_quantity: "Amount",
    instructions: 'Step 1: Do this',
    cuisine: 'Cuisine Type',
    preparationTime: '40',
    imageUrl: 'https://imgur.com/oJ3GHiD.jpg',
    createdBy: 'ChefPlaceholder',
  });

const handleRecieveRecipe = (updatedRecipe:any) => {
  setCurrentRecipe(updatedRecipe)
}

function handlePutFromChild (){
  const exampleRecipe = { 
    title: 'Example Put Data',
    ingredients_name: 'Example ingredient',
    ingredients_quantity: 'Example quantity',
    instructions: 'Example instructions',
    cuisine: 'Example cuisine',
    preparationTime: '-1',
    imageUrl: 'https://i.imgur.com/spF0sFY.jpg',
    createdBy: 'Example creator'
  }
  setCurrentRecipe(exampleRecipe)
}


return (
   <div className='App'>
    <div className='overlay'>
      <div className='leftSide'>
      <InputInfo onReceiveRecipe={handleRecieveRecipe}/>
      <br /><br />
      <ActionButton handlePutFromChild= {handlePutFromChild}></ActionButton>
      <br /><br />
      </div>
      <div className='rightSide'>
      <RecipeDisplay recipe={currentRecipe} onReceiveRecipe={handleRecieveRecipe}></RecipeDisplay>
      </div>
    </div>
   </div>

)
}
export default App;
