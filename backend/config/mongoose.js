// Import the Mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const database = async () => {
    try {
        // Attempt to connect to the MongoDB database at the specified URL
        await mongoose.connect('mongodb://localhost/myDatabase', 
        // Log a success message if the connection is established
        console.log('Connected to MongoDB'));

    } catch (error) {
        // Log an error message and exit the process if the connection fails
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit the process with a failure code (1)
    }
}

// Export the database function for use in other parts of the application
module.exports = database;