require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./src/routes/postRoutes");
const userRoutes = require("./src/routes/userRoutes"); // ✅ IMPORTANT

const app = express(); // ✅ MUST COME BEFORE app.use

app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use("/posts", postRoutes);
app.use("/users", userRoutes); // ✅ THIS LINE FIXES YOUR ERROR

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});