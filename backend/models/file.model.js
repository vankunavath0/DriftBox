// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for the File model
const fileSchema = new mongoose.Schema({
    // Field for storing the file path (e.g., URL from Cloudinary)
    path: {
        type: String, // Data type is String
        required: [true, 'File path is required'] // Field is required with a custom error message
    },
    // Field for storing the original file name
    originalname: {
        type: String, // Data type is String
        required: [true, 'Original name is required'] // Field is required with a custom error message
    },
    // Field for storing the user ID associated with the file
    user: {
        type: mongoose.Schema.Types.ObjectId, // Data type is ObjectId (reference to another document)
        ref: 'User', // Reference to the User model
        required: [true, 'User ID is required'] // Field is required with a custom error message
    }
});

// Create the File model using the fileSchema
const File = mongoose.model('File', fileSchema);

// Export the File model for use in other parts of the application
module.exports = File;