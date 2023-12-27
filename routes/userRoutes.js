const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
} = require("../controllers/userController");

// Router Object Creation
const router = express.Router();

// Get All Users
router.get("/all-users", getAllUsers);

// Sign Up
router.post("/register", registerController);

// Login
router.post("/login", loginController);

module.exports = router;