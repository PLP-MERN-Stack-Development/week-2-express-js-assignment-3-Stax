// errors/CustomError.js

class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message); // Call the parent Error class constructor
        this.name = this.constructor.name; // Set the error name to the class name
        this.statusCode = statusCode; // Custom status code for the error
        // Capture a stack trace for debugging, excluding the constructor call itself
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;