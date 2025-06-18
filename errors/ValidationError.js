// errors/ValidationError.js

const CustomError = require('./CustomError');

/**
 * Custom error class for validation failures (HTTP 400).
 */
class ValidationError extends CustomError {
    constructor(message = 'Validation failed.', errors = []) {
        super(message, 400); // Default message and status code for Bad Request
        this.errors = errors; // Array to hold specific validation error details
    }
}

module.exports = ValidationError;
