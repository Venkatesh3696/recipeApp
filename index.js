const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AuthRoute = require("./routes/auth.route");
const RecipeRoute = require("./routes/api/recipe.route");

const cors = require("cors");

//environvent variables
const mongoURI = process.env.mongoURI;

const app = express();

const PORT = 5000;

app.use(cors());
// middleware to parse json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", AuthRoute);

app.use("/recipes", RecipeRoute);

app.get("/", (req, res) => {
  res.send("recipes");
});

try {
  mongoose.connect(mongoURI).then(() => {
    console.log("mongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  });
} catch (error) {
  console.log("server error", error);
}
