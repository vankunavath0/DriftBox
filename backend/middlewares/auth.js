// Import the jsonwebtoken library for verifying JWT tokens
const jwt = require("jsonwebtoken");

// Define a middleware function to authenticate users
function auth(req, res, next) {
    // Extract the token from cookies (or use headers if preferred)
    const token = req.cookies.token;

    // If no token is found, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    try {
        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Log the decoded token for debugging purposes
        console.log("Decoded Token:", decoded);

        // Attach the decoded user information to the request object
        req.user = decoded; // Ensure `decoded` contains the expected fields (e.g., `user_id`)

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return a 401 Unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
    }
}

// Export the authentication middleware for use in routes
module.exports = auth;