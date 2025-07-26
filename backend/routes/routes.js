// Import the Express library for creating the router
const express = require('express');
const routes = express.Router();

// Import the register and login controllers for handling user registration and login
const register = require('../controller/register.controller');
const login = require('../controller/login.controller');

// Import express-validator for request validation
const { body, validationResult } = require('express-validator');

// Configure the router to parse JSON and URL-encoded request bodies
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

// Import the jsonwebtoken library for JWT handling (not used directly in this file)
const jwt = require('jsonwebtoken');

// Home Route - Welcome Page
routes.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

// Register Page Route - Render the registration form
routes.get('/register', (req, res) => {
    console.log('Register page is online');
    res.render('register.ejs'); // Render the register.ejs view
});

// Login Page Route - Render the login form
routes.get('/login', (req, res) => {
    console.log('Login page is online');
    res.render('login.ejs'); // Render the login.ejs view
});

// Validation middleware for the registration form
const validateRegister = () => {
    return [
        // Validate email field
        body('email')
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Invalid email format"),

        // Validate phone field
        body('phone')
            .notEmpty().withMessage("Phone number is required")
            .isMobilePhone().withMessage("Invalid phone number format"),

        // Validate username field
        body('username')
            .notEmpty().withMessage("Username is required"),

        // Validate password field
        body('password')
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

        // Validate confirmPassword field
        body('confirmPassword')
            .custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match")
    ];
};

// Validation middleware for the login form
const validateLogin = () => {
    return [
        // Validate username field
        body('username')
            .notEmpty().withMessage("Username is required"),

        // Validate password field
        body('password')
            .notEmpty().withMessage("Password is required")
    ];
};

// Register Route - Handle user registration
routes.post('/register', validateRegister(), register);

// Login Route - Handle user login
routes.post('/login', validateLogin(), login);

// Export the router for use in the main application
module.exports = routes;