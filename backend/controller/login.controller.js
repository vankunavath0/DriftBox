// Import the User model for database operations
const User = require("../models/user.model");

// Import the bcrypt library for password hashing and comparison
const bcrypt = require("bcrypt");

// Import the jsonwebtoken library for generating and verifying JWT tokens
const jwt = require("jsonwebtoken");

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Define an asynchronous function to handle user login
const login = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Ensure the stored password is not undefined
    if (!existingUser.password) {
      return res
        .status(500)
        .json({ message: "Server error: User password is missing in the database" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    // Generate a JWT token with user details and a secret key
    const token = jwt.sign(
      { user_id: existingUser._id, username }, // Payload containing user details
      process.env.SECRET_KEY, // Secret key from environment variables
      { expiresIn: "1h" } // Token expiration time
    );

    // Set the JWT token as a cookie in the response
    res.cookie("token", token);

    // Respond with a success message
    res.json({ message: "�� Login successful" });

  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the login function for use in routes
module.exports = login;