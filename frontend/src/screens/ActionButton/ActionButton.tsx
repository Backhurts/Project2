import React, { useState } from "react";
import "./ActionButton.css";

interface ActionButtonProps {
  handlePutFromChild: () => void;
  onReceiveRecipe: (recipe: any) => void;
  currentRecipe: any;
}

function ActionButton({
  handlePutFromChild,
  onReceiveRecipe,
  currentRecipe,
}: ActionButtonProps) {
  const [inputID, setInputID] = useState("");

  const handleIDchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(inputID);
    setInputID(e.target.value);
  };

  // ------------------------------------- GET+ID ----------------------------------

  function handleGet() {
    fetch(`http://localhost:3001/api/recipes/${inputID}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log("GET response:", data);
        onReceiveRecipe(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while making GET request:", error);
      });
  }

  // -------------------------------------  PUT ----------------------------------
  function handlePut() {
    console.log(currentRecipe);

    fetch(`http://localhost:3001/api/recipes/${inputID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentRecipe),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log("PUT response:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while making PUT request:", error);
      });
    handlePutFromChild();
  }

  // ------------------------------------- DELETE+ID ----------------------------------
  function handleDeleteOne() {
    // Logic for DELETE request
    fetch(`http://localhost:3001/api/recipes/${inputID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log("DELETE response:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while making DELETE request:", error);
      });
  }

  // ------------------------------------- DELETE ----------------------------------
  function handleDeleteAll() {
    // Logic for DELETE all request
    fetch(`http://localhost:3001/api/recipes/`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log("DELETE ALL response:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while making DELETE ALL request:", error);
      });
  }

  return (
    <div id="actionButtons">
      <input
        type="text"
        onChange={handleIDchange}
        name="ID"
        placeholder="Enter ID to either GET or DELETE"
      />
      <br />
      <br />
      <button name="GET" onClick={handleGet}>
        GET
      </button>
      <button name="PUT " onClick={handlePut}>
        PUT
      </button>
      <button name="DELETE ONE" onClick={handleDeleteOne}>
        DELETE ONE
      </button>
      <button name="DELETE ALL" onClick={handleDeleteAll}>
        DELETE ALL
      </button>
    </div>
  );
}

export default ActionButton;
