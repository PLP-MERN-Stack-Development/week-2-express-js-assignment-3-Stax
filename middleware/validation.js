// middleware/validation.js

const ValidationError = require('../errors/ValidationError'); // Import your custom error class

/**
 * Middleware to validate product data for creation (POST) and update (PUT) operations.
 * Checks for required fields and correct data types.
 * Throws a ValidationError if validation fails.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    const errors = []; // Array to store validation errors

    // --- Validation for POST (creation) ---
    if (req.method === 'POST') {
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            errors.push('Name is required and must be a non-empty string.');
        }
        if (!description || typeof description !== 'string' || description.trim().length === 0) {
            errors.push('Description is required and must be a non-empty string.');
        }
        if (typeof price !== 'number' || price <= 0) {
            errors.push('Price is required and must be a positive number.');
        }
        if (!category || typeof category !== 'string' || category.trim().length === 0) {
            errors.push('Category is required and must be a non-empty string.');
        }
        if (typeof inStock !== 'boolean' && inStock !== undefined) {
             errors.push('inStock must be a boolean if provided.');
        }
    }

    // --- Validation for PUT (update) ---
    if (req.method === 'PUT') {
        let hasValidField = false;

        if (name !== undefined) {
            if (typeof name !== 'string' || name.trim().length === 0) {
                errors.push('Name must be a non-empty string if provided.');
            } else {
                hasValidField = true;
            }
        }
        if (description !== undefined) {
            if (typeof description !== 'string' || description.trim().length === 0) {
                errors.push('Description must be a non-empty string if provided.');
            } else {
                hasValidField = true;
            }
        }
        if (price !== undefined) {
            if (typeof price !== 'number' || price <= 0) {
                errors.push('Price must be a positive number if provided.');
            } else {
                hasValidField = true;
            }
        }
        if (category !== undefined) {
            if (typeof category !== 'string' || category.trim().length === 0) {
                errors.push('Category must be a non-empty string if provided.');
            } else {
                hasValidField = true;
            }
        }
        if (inStock !== undefined) {
            if (typeof inStock !== 'boolean') {
                errors.push('inStock must be a boolean if provided.');
            } else {
                hasValidField = true;
            }
        }

        if (!hasValidField && Object.keys(req.body).length > 0) {
            errors.push('No valid fields provided for product update.');
        } else if (Object.keys(req.body).length === 0) {
             errors.push('Request body cannot be empty for product update.');
        }
    }

    // If there are any validation errors, THROW a ValidationError
    if (errors.length > 0) {
        throw new ValidationError('Validation failed', errors);
    }

    // If validation passes, call the next middleware or route handler
    next();
};

module.exports = validateProduct;
