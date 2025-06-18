// errors/NotFoundError.js

const CustomError = require('./CustomError');

/**
 * Custom error class for when a resource is not found (HTTP 404).
 */
class NotFoundError extends CustomError {
    constructor(message = 'Resource not found.') {
        super(message, 404); 
    }
}

module.exports = NotFoundError;