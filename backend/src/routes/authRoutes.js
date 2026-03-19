import express from "express";

const router = express.Router();

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    res.json({ message: "Signup working" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    res.json({ message: "Login working" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ⭐⭐⭐ MOST IMPORTANT LINE ⭐⭐⭐
export default router;