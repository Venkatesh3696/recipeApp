const express = require("express");

const {
  register,
  login,
  getProfile,
} = require("../controllers/auth.controllers");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
