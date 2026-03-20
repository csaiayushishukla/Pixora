import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./src/routes/postRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ 1. Middleware
app.use(express.json());

// ✅ 2. Serve images
app.use("/uploads", express.static("uploads"));

// ✅ 3. FIXED CORS (FINAL)
const allowedOrigins = [
  "http://localhost:5173",
  "https://pixora-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps / postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ 4. Preflight (VERY IMPORTANT)
app.options("*", cors());

// ✅ 5. Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// ✅ 6. Routes
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/auth", authRoutes);

// ✅ 7. DB + Server
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

})
.catch((err) => {
  console.log("❌ DB Error:", err.message);
});