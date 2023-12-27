const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// New User Registration
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Server Side Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Some Fields have not been filled",
      });
    }
    // Checking Existing User
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User Already Exists, Kindly Login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Adding New User to Database
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Successfully Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in User Registration",
      success: false,
      error,
    });
  }
};

// Fetch All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "All Users",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching User Details",
      error,
    });
  }
};

// Login for Existing User
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Server Side Validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email not Registered, Kindly Sign Up First",
      });
    }

    // Credential Matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid Username/Password",
      });
    }
    const token = jwt.sign({...user},process.env.JWT_SECRET)
    return res.status(200).send({
      success: true,
      messgae: "User Successfully Logged In",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Logging In User",
      error,
    });
  }
};

// User Details from Token
exports.getUser = async (req,res) => {
  try {
    const token = req.body.token;
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    res.status(200).send({
      success: true,
      message: "User Successfully Fetched",
      decode
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid Token",
      error
    })
  }
}