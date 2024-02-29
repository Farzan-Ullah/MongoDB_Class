const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded());

const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  class: Number,
});
const Child = mongoose.model("child", {
  firstName: String,
  lastName: String,
  class: Number,
});

app.get("/", (req, res) => {
  res.send("New Express Server");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "SUCCESS",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Something Went Wrong!",
    });
  }
  res.send("New Express Server");
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Server is up :)"))
    .catch((error) => console.log(error));
});
