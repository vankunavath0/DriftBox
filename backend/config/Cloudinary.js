// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the Cloudinary library and specifically use version 2 of the API
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with credentials stored in environment variables
cloudinary.config({ 
  cloud_name: process.env.your_cloud_name, // Cloudinary cloud name from .env
  api_key: process.env.your_api_key,       // Cloudinary API key from .env
  api_secret: process.env.your_api_secret  // Cloudinary API secret from .env
});

// Export the configured Cloudinary instance for use in other parts of the application
module.exports = cloudinary;