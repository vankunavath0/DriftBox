// Import the Mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define the schema for the User model
const userschema = mongoose.Schema({
  // Field for storing the username
  username: {
    type: String, // Data type is String
    required: true, // Field is required
    unique: true, // Ensures the username is unique
    minlength: 3, // Minimum length of 3 characters
    maxlength: 50, // Maximum length of 50 characters
    trim: true, // Trims whitespace from the input
  },
  // Field for storing the email
  email: {
    type: String, // Data type is String
    required: true, // Field is required
    unique: true, // Ensures the email is unique
    lowercase: true, // Converts the email to lowercase
    trim: true, // Trims whitespace from the input
  },
  // Field for storing the password
  password: {
    type: String, // Data type is String
    required: true, // Field is required
    minlength: 4, // Minimum length of 4 characters
    maxlength: 100, // Maximum length of 100 characters
    select: true, // Allows the password to be selected in queries (set to `false` to exclude it by default)
  },
  // Field for storing the phone number
  phone: {
    type: String, // Data type is String
    required: false, // Field is optional
    unique: true, // Ensures the phone number is unique
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"], // Validates the phone number format
  },
  // Field for storing the creation date
  createdAt: {
    type: Date, // Data type is Date
    default: Date.now, // Default value is the current date and time
  },
});

// Create the User model using the userschema
const user = mongoose.model("User", userschema);

// Export the User model for use in other parts of the application
module.exports = user;