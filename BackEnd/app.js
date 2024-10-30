const mongoose = require("mongoose");
var express = require("express");
require("dotenv").config();
var app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to your MongoDB database
var url = process.env.DB_CONNECTION_STR;
mongoose
  .connect(url, {})
  .then(() => console.log("connected succefully to mongoDB!"))
  .catch((err) => console.error("something went wrong", err));

app.use(cors({ origin: "http://localhost:3000" }));
const RecipeRoutes = require("./Routes/recipesRoutes");
app.use("/api/recipes", RecipeRoutes);

app.use(express.static("build"));
//=========================
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`My app is listening on port ${port}!`);
});
