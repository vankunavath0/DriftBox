// Import the Express library for creating the server
const express = require("express");

// Import the routes for handling API endpoints
const routes = require("./routes/routes");

// Import the database configuration for connecting to MongoDB
const database = require("./config/mongoose");

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import the cookie-parser middleware for handling cookies
const cookieParser = require('cookie-parser');

// Import the main routes for handling additional endpoints
const router = require('./routes/main.routes');

// Create an Express application
const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS for rendering views
app.set('view engine', 'ejs');

// Use the cookie-parser middleware to parse cookies
app.use(cookieParser());

// Set up the port number (use the value from .env or default to 4000)
const port = process.env.PORT || 4000;

// Use the imported routes for handling requests
app.use("/", routes); // Main API routes
app.use("/", router); // Additional routes (e.g., home or other endpoints)

// Connect to the MongoDB database
database(); // Call the database connection function

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});