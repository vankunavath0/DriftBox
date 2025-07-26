// Import the Streamifier library to convert buffers into readable streams
const streamifier = require("streamifier");

// Import the Cloudinary configuration for uploading files to Cloudinary
const cloudinary = require("../config/Cloudinary");

// Import the File model for saving file details to MongoDB
const File = require("../models/file.model");

// Define an asynchronous function to handle file uploads
const uploadFile = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Function to upload a file buffer to Cloudinary
        const uploadFromBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                // Create a Cloudinary upload stream
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "uploads" }, // Specify the folder in Cloudinary
                    (error, result) => {
                        if (error) reject(error); // Reject on error
                        else resolve(result); // Resolve with the upload result
                    }
                );
                // Convert the buffer to a readable stream and pipe it to Cloudinary
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        // Upload the file buffer to Cloudinary and get the result
        const result = await uploadFromBuffer(req.file.buffer);

        // Save file details to MongoDB
        const newFile = new File({
            path: result.secure_url, // Save the secure URL from Cloudinary
            originalname: req.file.originalname, // Save the original file name
            user: req.user.user_id // Save the user ID extracted from the request (e.g., from JWT)
        });

        // Save the new file document to the database
        await newFile.save();

        // Respond with a success message and the file URL
        res.status(200).json({
            message: "File uploaded successfully",
            url: result.secure_url
        });

    } catch (error) {
        // Handle errors and respond with a 500 status code
        res.status(500).json({ error: error.message });
    }
};

// Export the file upload handler for use in routes
module.exports = uploadFile;