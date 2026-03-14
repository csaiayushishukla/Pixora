const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./src/routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// main route
app.use("/posts", postRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Pixora backend running");
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});