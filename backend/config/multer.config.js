// Import the Multer library for handling file uploads
const multer = require("multer");

// Import the Path module for working with file and directory paths
const path = require("path");

// Configure Multer to store files in memory (not on disk)
const storage = multer.memoryStorage();

// Set up Multer with custom configurations
const upload = multer({
  storage: storage, // Use the memory storage configuration
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit of 5MB
  fileFilter: (req, file, cb) => {
    // Custom file filter logic (optional)
    if (file.mimetype) {
      // If the file has a valid mimetype, allow the upload
      return cb(null, true);
    } else {
      // If the file type is invalid, reject the upload with an error
      return cb(new Error("Invalid file type"));
    }
  },
});

// Export the configured Multer instance for use in other parts of the application
module.exports = upload;