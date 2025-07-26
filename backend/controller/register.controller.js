// Import the User model for database operations
const User = require("../models/user.model");

// Import the bcrypt library for password hashing
const bcrypt = require("bcrypt");

// Define an asynchronous function to handle user registration
const register = async (req, res) => {
  try {
    // Extract user details from the request body
    const { username, email, password, phone, confirmPassword } = req.body;
    console.log("Password:", password);
console.log("Confirm Password:", confirmPassword);

if (!username || !email || !password || !confirmPassword || !phone) {
  return res.status(400).json({ message: "All fields are required" });
}

    // ✅ Step 1: Check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // ✅ Step 2: Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Step 3: Hash the password before saving it to the database
    const hashpassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // ✅ Step 4: Create a new user instance with the provided details
    const newUser = new User({
      username,
      email,
      password: hashpassword,
      phone,
    });

    // ✅ Step 5: Save the new user to the database
    await newUser.save();

    // ✅ Step 6: Respond with a success message
    res.status(201).json({ message: "✅ User registered successfully" });

  } catch (error) {
    // Log the error and respond with a 500 status code
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the register function for use in routes
module.exports = register;
