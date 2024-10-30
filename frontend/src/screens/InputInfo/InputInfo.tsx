import React, { useState } from "react";
import "./InputInfo.css";
import { updateRecipe } from "../../../../BackEnd/Models/Repository/recipeRepository";

// allows me to decide what the temp Recipe should look like, meaning without the "created at" and "updated at" fields
// "?" means a value is optional, not NULL, but undefined
interface InsertedRecipe {
  title?: string;
  ingredients_name?: string;
  ingredients_quantity?: string;
  instructions?: string;
  cuisine?: string;
  preparationTime?: string;
  imageUrl?: string;
  createdBy?: string;
}

// Handles the amount of input fields for INGREDIENTS and INSTRUCTIONS
// counter for ingredients and instructions
let ingredientCount = 1;
let instructionCount = 1;

// ---------------------------------------------------------------------------
// function for adding new input fields for both at the same time
function addInputField(containerID, inputName, placeholder) {
  // reference for which div were adding an input field to
  let container = document.getElementById(containerID);

  // creating a new input
  let newInput = document.createElement("input");
  newInput.type = "text";

  // checks if the divID is the same as ingredientAddRemove then
  // if its true adds the ingredientsCount to the name
  // otherwise adds instructionCount to the name
  let numberTag =
    containerID === "ingredientAddRemove" ? ingredientCount : instructionCount;

  newInput.name = `${inputName}`;

  newInput.placeholder = `${placeholder} ${numberTag}`;
  container?.appendChild(newInput);
}

// ---------------------------------------------------------------------------
// function to remove last input field
function removeInputField(containerID) {
  const container = document.getElementById(containerID);

  const lastInput = container?.lastElementChild as HTMLInputElement;
  if (lastInput && lastInput.type !== "button") {
    container?.removeChild(lastInput);
  }
}

// ---------------------------------------------------------------------------
// button functions that activate the above functions

function addIngredient() {
  ingredientCount++;
  //  input name should be structured like ingredients[COUNTER].quantity OR ingredients[COUNTER].name
  addInputField(
    "ingredientAddRemove",
    `ingredient[${ingredientCount - 1}].name`,
    "Ingredient name"
  );
  addInputField(
    "ingredientAddRemove",
    `ingredient[${ingredientCount - 1}].quantity`,
    "Amount"
  );
}

function removeIngredient() {
  if (ingredientCount > 0) {
    ingredientCount--;
    removeInputField("ingredientAddRemove");
    removeInputField("ingredientAddRemove");
  }
}

function removeInstructions() {
  if (instructionCount > 1) {
    instructionCount--;

    removeInputField("instructionAddRemove");
  }
}

interface InputInfoProps {
  onReceiveRecipe: (updatedRecipe: InsertedRecipe) => void;
}

const InputInfo: React.FC<InputInfoProps> = ({ onReceiveRecipe }) => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients_name: "",
    ingredients_quantity: "",
    instructions: "",
    cuisine: "",
    preparationTime: "",
    imageUrl: "",
    createdBy: "",
  });

  const handleChange = () => {
    onReceiveRecipe(formData);
  };

  const [instructions, setInstructions] = useState([""]);
  const [tempRecipe, setTempRecipe] = useState<InsertedRecipe | null>(null);

  // handles the instructions array since you can't just use "instructions[INDEX]" in the input fields

  let index = 0;
  const handleIntsructionChange = (e, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = e.target.value;
    index++;
    console.log(newInstructions);

    setInstructions(newInstructions);
  };

  function addInstruction() {
    instructionCount++;
    setInstructions([...instructions, ""]);
    addInputField(
      "instructionAddRemove",
      `Instructions[${instructionCount - 1}]`,
      "Instructions"
    );
  }

  // const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setTempRecipe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // }

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    onReceiveRecipe(formData);
    console.log(formData);
    console.log(JSON.stringify(formData));

    // grabbing info from inputs to send to RecipeDisplay
    if (formData) {
      //fetch
      const url = "http://localhost:3001/api/recipes/";

      fetch(url, {
        method: "POST",
        // mode: "no-cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((result) => {
          console.log(result);
          return result.json();
        })
        .then((data) => {
          console.log(data);
          onReceiveRecipe(formData);
        })
        .catch((err) => {
          console.log("Error while submiting form", err);
        });
    }
  };

  // random data sets for GENERATE DATA button
  // this then goes to RecipeDisplay as the current recipe
  function GenerateData() {
    const exampleRecipes = [
      {
        title: "Chicken Alfredo Pasta",
        ingredients_name: "Chicken breast",
        ingredients_quantity: "1 lb",
        instructions: "Preheat the oven to 350°F (175°C).",
        cuisine: "Italian",
        preparationTime: "40",
        imageUrl: "https://imgur.com/oJ3GHiD.jpg",
        createdBy: "ChefCooker123",
      },
      {
        title: "Vegetarian Stir-Fry",
        ingredients_name: "Tofu",
        ingredients_quantity: "1 block",
        instructions: "Preheat the oven to 350°F (175°C).",
        cuisine: "Asian",
        preparationTime: "30",
        imageUrl: "https://imgur.com/zs2AqhJ.jpg",
        createdBy: "VeggieChef22",
      },
      {
        title: "Classic Margherita Pizza",
        ingredients_name: "Pizza dough",
        ingredients_quantity: "1 ball",
        instructions: "Preheat the oven to 350°F (175°C).",
        cuisine: "Italian",
        preparationTime: "25",
        imageUrl: "https://imgur.com/AfNm4ms.jpg",
        createdBy: "PizzaMasterChef",
      },
      {
        title: "Chocolate Chip Cookies",
        ingredients_name: "All-purpose flour",
        ingredients_quantity: "2 1/4 cups",
        instructions: "Preheat the oven to 350°F (175°C).",
        cuisine: "Dessert",
        preparationTime: "15",
        imageUrl: "https://imgur.com/WiEhgd7.jpg",
        createdBy: "CookieMonster123",
      },
    ];
    let number = Math.floor(Math.random() * (4 - 0));
    let RecipeToBeSent = exampleRecipes[number];
    return RecipeToBeSent;
  }

  function handleRandomRecipeButton() {
    let randomRecipe = GenerateData();
    // checks if the info isn't the same as what's present and rerolls if it is
    while (randomRecipe.title === formData.title) {
      console.log(`same info, rerolling!`);

      randomRecipe = GenerateData();
    }
    setFormData({
      title: randomRecipe.title || "",
      ingredients_name: randomRecipe.ingredients_name || "",
      ingredients_quantity: randomRecipe.ingredients_quantity || "",
      instructions: randomRecipe.instructions || "",
      cuisine: randomRecipe.cuisine || "",
      preparationTime: randomRecipe.preparationTime || "",
      imageUrl: randomRecipe.imageUrl || "",
      createdBy: randomRecipe.createdBy || "",
    });
  }

  // V what will be present on screen V
  return (
    <div id="inputRecipeAndID">
      <input
        type="text"
        onBlur={handleChange}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        name="title"
        placeholder={formData.title ? "" : "Title"}
      />
      <br />
      {/* // ------------------- ingredients ------------------- */}
      <br />
      <div id="ingredientAddRemove">
        <input
          type="text"
          onBlur={handleChange}
          value={formData.ingredients_name}
          onChange={(e) =>
            setFormData({ ...formData, ingredients_name: e.target.value })
          }
          name="ingredients_name"
          placeholder={formData.ingredients_name ? "" : "Ingredient"}
        />

        <input
          type="text"
          onBlur={handleChange}
          value={formData.ingredients_quantity}
          onChange={(e) =>
            setFormData({ ...formData, ingredients_quantity: e.target.value })
          }
          name="ingredients_quantity"
          placeholder={formData.ingredients_quantity ? "" : "Quantity"}
        />

        {/* <input type='button' onClick={addIngredient} value="+"/> */}
        {/* <input type='button' onClick={removeIngredient} value="-"/> */}
        <br />
      </div>
      <br />

      {/* // ------------------- instructions------------------- */}
      <div id="instructionAddRemove">
        <input
          type="text"
          onBlur={handleChange}
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          name={`instructions`}
          placeholder={formData.instructions ? "" : "Instructions"}
        />
        {/* <input type='button' onClick={addInstruction} value="+"/>
        <input type='button' onClick={removeInstructions} value="-"/> */}
        <br />
      </div>
      <br />

      <input
        type="text"
        onBlur={handleChange}
        value={formData.cuisine}
        onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
        name="cuisine"
        placeholder={formData.cuisine ? "" : "Cuisine"}
      />
      <br />

      <input
        type="text"
        onBlur={handleChange}
        value={formData.preparationTime}
        onChange={(e) =>
          setFormData({ ...formData, preparationTime: e.target.value })
        }
        name="preparationTime"
        placeholder={formData.preparationTime ? "" : "Prep time"}
      />
      <br />

      <input
        type="text"
        onBlur={handleChange}
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        name="imageUrl"
        placeholder={formData.imageUrl ? "" : "Image Url"}
      />
      <br />

      <input
        type="text"
        onBlur={handleChange}
        value={formData.createdBy}
        onChange={(e) =>
          setFormData({ ...formData, createdBy: e.target.value })
        }
        name="created By?"
        placeholder={formData.createdBy ? "" : "Created By?"}
      />
      <br />

      <br />
      <input type="submit" onClick={handleSubmit} value="SUBMIT" />
      <br />
      <br />

      <input
        type="button"
        onClick={handleRandomRecipeButton}
        value="GENERATE DATA"
      />
      <br />
    </div>
  );
};
export default InputInfo;
