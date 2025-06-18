// server.js

// Load environment variables from .env file (must be at the very top)
require('dotenv').config();

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

// Import middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');

// Import custom error classes
const CustomError = require('./errors/CustomError');
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError'); // Though validation middleware will throw this

// Create Express app
const app = express();

// Constants
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Global Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
app.use('/api', authenticate); // Apply authentication to all /api routes

// Task 1: Implement a "Hello World" route at the root endpoint
app.get('/', (req, res) => {
    res.send('Hello World from Express.js Products API!');
});

// Task 2: Use product routes for /api/products
app.use('/api', productRoutes);

// --- Task 4: Global Error Handling Middleware ---
// This middleware must be placed AFTER all your routes and other app.use calls.
app.use((err, req, res, next) => {
    // Log the error for internal debugging
    console.error(err.stack);

    // Determine status code and message based on the error type
    console.log(`Error type received in handler: ${err.constructor.name}`);
    console.log(`Is it an instance of NotFoundError? ${err instanceof NotFoundError}`);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong on the server.';
    let errors = []; // For validation errors

    if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message;
    } else if (err instanceof ValidationError) {
        statusCode = 400;
        message = err.message;
        errors = err.errors || []; // Include specific validation errors
    } else if (err instanceof CustomError) {
        // Handle other custom errors not explicitly listed above
        // e.g., if you introduce a UnauthorizedError or ForbiddenError
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        // Example: Handling Mongoose CastError for invalid IDs (if you switch to MongoDB later)
        statusCode = 400;
        message = `Invalid ID: ${err.value}`;
    }

    // Send a structured JSON error response
    res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors.length > 0 ? errors : undefined // Only include 'errors' array if it has content
    });
});
// --- END Global Error Handling Middleware ---


// Fire up the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Test the root endpoint in your browser: http://localhost:3000/');
    console.log('API documentation will be available at /api-docs (after Task 5)');
    console.log(`API Key expected: ${API_KEY ? 'Set' : 'NOT SET - Authentication may fail!'}`);
});
