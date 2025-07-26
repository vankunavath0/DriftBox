// Import the Express library for creating the router
const express = require("express");
const router = express.Router();

// Import the Multer configuration for handling file uploads
const upload = require("../config/multer.config");

// Import the authentication middleware to protect routes
const authMiddleware = require("../middlewares/auth");

// Import the file upload controller for handling upload logic
const uploadFile = require("../controller/upload.controller");

// Import the File model for interacting with the database
const File = require("../models/file.model");

// Import the Cloudinary configuration for file storage and retrieval
const cloudinary = require("../config/Cloudinary");

// Home Route - Fetch User Files
router.get("/home", authMiddleware, async (req, res) => {
  try {
    // Fetch all files associated with the logged-in user
    const userFiles = await File.find({ user: req.user.user_id });

    // Render the "index" view with the user's files
    res.render("index", { files: userFiles });
  } catch (error) {
    // Log and handle errors
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Error fetching files" });
  }
});

// Upload Route
router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

// Download Route
router.get("/download/:path", authMiddleware, async (req, res) => {
  try {
    // Extract the logged-in user's ID and the requested file path
    const loggedInUserId = req.user.user_id;
    const filePath = req.params.path;

    // Log the user ID and requested file path for debugging
    console.log("User ID:", loggedInUserId);
    console.log("Requested File Path:", filePath);

    // Find the file in the database that belongs to the user
    const file = await File.findOne({ user: loggedInUserId, path: filePath });
    if (!file) {
      // If the file is not found or unauthorized, return a 404 error
      console.error("File not found or unauthorized access");
      return res.status(404).json({ message: "File not found or unauthorized" });
    }

    // Log the file details for debugging
    console.log("File found in DB:", file);

    // Generate a signed URL for the file from Cloudinary
    const signedUrl = cloudinary.url(file.path, {
      secure: true, // Use HTTPS
      sign_url: true, // Enable URL signing
      transformation: [{ fetch_format: "auto" }], // Apply transformations if needed
      expires_at: Math.floor(Date.now() / 1000) + 3600, // Set URL expiration to 1 hour
    });

    // Log the generated signed URL for debugging
    console.log("Generated Signed URL:", signedUrl);

    // Send the signed URL as a response
    res.json({ downloadUrl: signedUrl });
  } catch (error) {
    // Log and handle errors
    console.error("Error generating download link:", error);
    res.status(500).json({ error: "Error generating download link" });
  }
});

// Export the router for use in the main application
module.exports = router;