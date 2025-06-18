// middleware/auth.js

/**
 * Authentication middleware for Express.js.
 * Checks for a valid API key in the 'x-api-key' request header.
 * The API key is loaded from process.env.API_KEY.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const authenticate = (req, res, next) => {
    // Get the API key from the request headers
    const apiKey = req.header('x-api-key');
    // Get the expected API key from environment variables
    const expectedApiKey = process.env.API_KEY;

    // --- DEBUGGING LOGS ---
    console.log('--- AUTHENTICATION DEBUG ---');
    console.log(`Expected API Key (from .env): '${expectedApiKey}'`);
    console.log(`Received API Key (from header): '${apiKey}'`);
    console.log(`Are keys equal? ${apiKey === expectedApiKey}`);
    console.log('--- END AUTHENTICATION DEBUG ---');
    // --- END DEBUGGING LOGS ---

    // Check if API_KEY is set in .env
    if (!expectedApiKey) {
        console.warn('WARNING: API_KEY is not set in environment variables. Authentication will not work.');
        return res.status(500).json({ message: 'Server configuration error: API_KEY not set.' });
    }

    // Compare the provided API key with the expected API key
    if (!apiKey || apiKey !== expectedApiKey) {
        // If keys don't match or key is missing, send 401 Unauthorized
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing API Key.' });
    }

    // If authentication succeeds, call the next middleware or route handler
    next();
};

module.exports = authenticate; // Export the authentication function
