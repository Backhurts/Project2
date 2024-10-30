import React, { useState } from 'react'
import "./ActionButton.css"



function ActionButton({ handlePutFromChild}) {
  const [inputID, setInputID] = useState("")
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
  const handleIDchange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    console.log(inputID);
    setInputID(e.target.value)
  }

  // ------------------------------------- GET+ID ----------------------------------
  function handleGet(){
    console.log("deez");
    
    fetch(`/api/recipes/${inputID}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log('GET response:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while making GET request:', error);
      });
  };

  // -------------------------------------  PUT ----------------------------------
  function handlePut () {

    fetch(`/api/recipes/${inputID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exampleRecipe),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log('PUT response:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while making PUT request:', error);
      });
      handlePutFromChild()

  };

  // ------------------------------------- DELETE+ID ----------------------------------
  function handleDeleteOne  () {
    // Logic for DELETE request
    fetch(`/api/recipes/${inputID}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log('DELETE response:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while making DELETE request:', error);
      });
  };

  // ------------------------------------- DELETE ----------------------------------
  function handleDeleteAll () {
    // Logic for DELETE all request
    fetch(`/api/recipes/`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log('DELETE ALL response:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while making DELETE ALL request:', error);
      });
  };





  return (
    <div id='actionButtons'>
      <input type="text" onChange={handleIDchange} name='ID' placeholder="Enter ID to either GET or DELETE" />
      <br />
      <br />
      <button name='GET' onClick={handleGet}>GET</button>
      <button name='PUT' onClick={handlePut}>PUT</button>
      <button name='DELETE ONE' onClick={handleDeleteOne}>DELETE ONE</button>
      <button name='DELETE ALL' onClick={handleDeleteAll}>DELETE ALL</button>
    </div>
  )
}

export default ActionButton
