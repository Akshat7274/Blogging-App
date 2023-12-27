const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  getUser
} = require("../controllers/userController");

// Router Object Creation
const router = express.Router();

// Get All Users
router.get("/all-users", getAllUsers);

// Get Logged In User
router.post("/get-user", getUser);

// Sign Up
router.post("/register", registerController);

// Login
router.post("/login", loginController);

module.exports = router;